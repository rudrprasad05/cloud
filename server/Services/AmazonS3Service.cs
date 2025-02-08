using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Interfaces;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Configuration;
using Amazon;

namespace server.Services
{
    public class AmazonS3Service : IAmazonS3Service
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        public AmazonS3Service(IConfiguration configuration)
        {
            // Initialize the S3 client
            var awsOptions = configuration.GetSection("AWS:S3");
            var accessKey = awsOptions["AccessKey"];
            var secretKey = awsOptions["SecretKey"];
            var region = RegionEndpoint.GetBySystemName(awsOptions["Region"]);

            _s3Client = new AmazonS3Client(accessKey, secretKey, region);
            _bucketName = awsOptions["BucketName"] ?? throw new InvalidOperationException("bucket name");
        }

        public async Task<GetObjectResponse?> GetObjectAsync(string fileName)
        {
            try
            {
                var request = new GetObjectRequest
                {
                    BucketName = _bucketName,
                    Key = "cloud/" + fileName
                };

                var response = await _s3Client.GetObjectAsync(request);
                return response;
            }
            catch (AmazonS3Exception ex)
            {
                Console.WriteLine($"S3 Error: {ex.Message}");
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error: {ex.Message}");
                return null;
            }
        }
        public async Task<string?> UploadFileAsync(IFormFile file)
        {
            if (file.Length > 0)
            {
                try
                {
                    // Generate a unique file name for the file
                    var fileName = "cloud/" + Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

                    // Create a new TransferUtility instance to upload the file
                    using (var newMemoryStream = new MemoryStream())
                    {
                        await file.CopyToAsync(newMemoryStream);
                        var fileTransferUtility = new TransferUtility(_s3Client);

                        // Upload the file to S3
                        await fileTransferUtility.UploadAsync(newMemoryStream, _bucketName, fileName);

                        // Return the file URL
                        return $"https://{_bucketName}.s3.amazonaws.com/{fileName}";
                    }
                }
                catch (AmazonS3Exception e)
                {
                    // Handle S3 exceptions here
                    throw new Exception($"Error uploading file: {e.Message}", e);
                }
            }

            return null;
        }
    }
}