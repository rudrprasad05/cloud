using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;
using server.Mappers;
using server.Models.Requests;

namespace server.Controllers
{   
    [ApiController]
    [Route("api/share")]
    public class ShareController : BaseController
    {
        private readonly IShareRepository _shareRepository;

        public ShareController(IShareRepository shareRepository)
        {
            _shareRepository = shareRepository;
        }

        [HttpPost("create/{id}")]
        public async Task<IActionResult> CreateShare([FromRoute] string id, [FromBody] NewShareRequest newShareRequest)
        {
            var req = await _shareRepository.CreateAsync(id);
            if(req == null)
            {
                return BadRequest("Share not Created");
            }

            return Ok(req);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetShare([FromRoute] string id)
        {
            var req = await _shareRepository.GetAsync(id);
            if(req == null)
            {
                return BadRequest("Share not Created");
            }

            return Ok(req);
        }

        [HttpGet("get-with-media/{id}")]
        public async Task<IActionResult> GetShareWithMedia([FromRoute] string id)
        {
            var req = await _shareRepository.GetAsyncWithMedia(id);
            if(req == null)
            {
                return BadRequest("Share not Created");
            }

            var dto = req.MapToShareWithMedia();

            return Ok(dto);
        }
        
        [HttpPatch("update/{id}")]
        public async Task<IActionResult> Update([FromRoute] string id, [FromBody] UpdateShareRequest updateShareRequest)
        {
            var req = await _shareRepository.UpdateAsync(id, updateShareRequest);
            if(req == null)
            {
                return BadRequest("Share not Created");
            }

            return Ok(req);
        }
    }
}