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
        private readonly IMediaRepository _mediaRepository;
        private readonly IAmazonS3Service _amazonS3Service;

        public MediaController(IMediaRepository mediaRepository, IAmazonS3Service amazonS3Service) 
        {
            _mediaRepository = mediaRepository;
            _amazonS3Service = amazonS3Service;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateMedia([FromForm] string id, IFormFile file)
        {
            var res = await _mediaRepository.CreateAsync(file, id);
            if(res == null)
            {
                return BadRequest("Media not Created");
            }

            res.FromMediaToDTO();

            return Ok(res);
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