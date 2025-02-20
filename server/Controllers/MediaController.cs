using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;
using server.Mappers;
using server.Models.Requests;

namespace server.Controllers
{
    [ApiController]
    [Route("api/media")]
    public class MediaController : BaseController
    {
        private readonly IMediaRepository _mediaRepository;
        private readonly IShareRepository _shareRepository;
        private readonly IAmazonS3Service _amazonS3Service;

        public MediaController(IMediaRepository mediaRepository,
            IAmazonS3Service amazonS3Service, 
            IShareRepository shareRepository,
            IConfiguration configuration, 
            ITokenService tokenService
        ) : base(configuration, tokenService)
        {
            _mediaRepository = mediaRepository;
            _amazonS3Service = amazonS3Service;
            _shareRepository = shareRepository;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateMedia([FromForm] string id, IFormFile file)
        {
            var req = await _mediaRepository.CreateAsync(file, id, UserId);
            if(req == null)
            {
                return BadRequest("Media not Created");
            }


            var resp = req.FromMediaToDTO();

            return Ok(resp);
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll([FromQuery] MediaQueryObject queryObject)
        {
            var media = await _mediaRepository.GetAll(queryObject, UserId);
            if(media == null)
            {
                return BadRequest();
            }
            var dtos = media.Select(m => m.FromMediaWithFolderToDTO()).ToList();
            return Ok(dtos);
        }

        [HttpPatch("star/{id}")]
        public async Task<IActionResult> Star([FromRoute] string id, [FromBody] StartMediaRequest request)
        {
            var media = await _mediaRepository.Star(id, request.Star, UserId);

            return Ok(media);
        }

        [HttpPatch("rename/{id}")]
        public async Task<IActionResult> Rename([FromRoute] string id, [FromBody] RenameMediaRequest request)
        {
            var media = await _mediaRepository.Rename(id, request.Name, UserId);
            if(media == null)
            {
                return BadRequest();
            }

            return Ok(media);
        }

        [HttpGet("get-one/{id}")]
        public async Task<IActionResult> GetOne([FromRoute] string id)
        {
            var media = await _mediaRepository.GetOne(id, UserId);
            if(media == null)
            {
                return Unauthorized();
            }

            var dto = media.FromMediaToDTO();
            return Ok(media);
        }

        [HttpDelete("recycle/{id}")]
        public async Task<IActionResult> Recycle([FromRoute] string id)
        {
            var media = await _mediaRepository.Recycle(id, UserId);
            if(media == null)
            {
                return Unauthorized();
            }

            var dto = media.FromMediaToDTO();
            return Ok(dto);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            var media = await _mediaRepository.Delete(id, UserId);
            if(media == null)
            {
                return Unauthorized();
            }

            var fileName = media?.Source?.Split('/').LastOrDefault();
            var deleteFromS3 = await _amazonS3Service.DeleteFileAsync(fileName ?? throw new InvalidOperationException());
            
            if(deleteFromS3 == true)
            {
                return Ok("deleted");
            }

            return BadRequest("not deleted");
        }
        
        [HttpGet("download")]
        public async Task<IActionResult> DownloadFile([FromQuery] string fileName)
        {
            try
            {
                var fileStream = await _amazonS3Service.GetObjectAsync(fileName);

                if (fileStream == null)
                {
                    return BadRequest("File not found or error retrieving file.");
                }

                using var responseStream = fileStream.ResponseStream;
                using var memoryStream = new MemoryStream();
                await responseStream.CopyToAsync(memoryStream);
                
                var contentType = fileStream.Headers["Content-Type"];
                return File(memoryStream.ToArray(), contentType, fileName);
            }
            catch (AmazonS3Exception ex)
            {
                return BadRequest($"S3 error: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }
    }
}