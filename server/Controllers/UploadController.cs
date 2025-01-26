using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;

namespace server.Controllers
{
    [ApiController]
    [Route("api/upload")]
    public class UploadController : ControllerBase
    {
        private readonly IAmazonS3Service _amazonS3Service;

        public UploadController(IAmazonS3Service amazonS3Service)
        {
            _amazonS3Service = amazonS3Service;
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        [RequestFormLimits(MultipartBodyLengthLimit = long.MaxValue)]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            // Upload the file to S3
            var fileUrl = await _amazonS3Service.UploadFileAsync(file);

            if (fileUrl == null)
            {
                return BadRequest("File upload failed.");
            }

            return Ok(new { FileUrl = fileUrl });
        }

        [HttpPost("many")]  
        [Consumes("multipart/form-data")]
        [RequestFormLimits(MultipartBodyLengthLimit = long.MaxValue)]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> UploadManyFile(List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var fileUrls = new List<string>();

            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    var fileUrl = await _amazonS3Service.UploadFileAsync(file);
                    if (fileUrl != null)
                    {
                        fileUrls.Add(fileUrl);
                    }
                    else
                    {
                        return BadRequest($"Failed to upload file: {file.FileName}");
                    }
                }
            }

            return Ok(new { FileUrls = fileUrls });
        }
    }
}