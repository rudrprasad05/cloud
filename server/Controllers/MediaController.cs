using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;
using server.Mappers;
using server.Models.Requests;

namespace server.Controllers
{
    [ApiController]
    [Route("api/media")]
    public class MediaController : ControllerBase
    {
        IMediaRepository _mediaRepository;
        IAmazonS3Service _amazonS3Service;

        public MediaController(IMediaRepository mediaRepository, IAmazonS3Service amazonS3Service) 
        {
            _mediaRepository = mediaRepository;
            _amazonS3Service = amazonS3Service;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateMedia([FromBody] NewMediaRequest request)
        {

            var media = request.MapToMedia();
            if (media == null)
            {
                return BadRequest();
            }

            var newMedia = await _mediaRepository.CreateAsync(media);
            if (newMedia == null)
            {
                return BadRequest(new { message = "Failed to create media." });
            }

            var dto = newMedia.FromMediaToDTO();
            return Ok(dto);
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var media = await _mediaRepository.GetAll();
            var dtos = media.Select(m => m.FromMediaToDTO()).ToList();
            return Ok(dtos);
        }
        
    }
}