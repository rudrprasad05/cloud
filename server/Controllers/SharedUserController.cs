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
    [Route("api/shared-user")]
    public class SharedUserController : BaseController
    {
        private readonly IShareUserRepository _sharedUserRepository;

        public SharedUserController(IShareUserRepository shareRepository, 
            IConfiguration configuration, 
            ITokenService tokenService
        ) : base(configuration, tokenService)
        {
            _sharedUserRepository = shareRepository;
        }

        [HttpPost("create")]
        public async Task<IActionResult> GetShareWithMedia([FromBody] NewSharedUserRequest newSharedUser)
        {
            var req = await _sharedUserRepository.CreateAsync(newSharedUser);
            if(req == null)
            {
                return BadRequest("Share not Created");
            }

            var dto = req.FromModelToDTO();

            return Ok(dto);
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetShared()
        {
            var req = await _sharedUserRepository.GetAsync();
            if(req == null)
            {
                return BadRequest("Share not Created");
            }

            var dto = req.Select(s => s.FromMediaToDTO());

            return Ok(dto);
        }
    }
}