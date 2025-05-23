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

        [HttpPost("create-with-user-id")]
        public async Task<IActionResult> CreateWithUserId([FromBody] NewSharedUserWithIdRequest newSharedUser)
        {
            var req = await _sharedUserRepository.CreateWithIdAsync(newSharedUser);
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

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetSharedBySharedId(string id)
        {
            var req = await _sharedUserRepository.GetUsersByShareIdAsync(id);
            if(req == null)
            {
                return BadRequest("Share not Created");
            }
            var dto = req.Select(s => s.MapToUserWithEmailDTO());

            return Ok(dto);
        }

        [HttpGet("get-users")]
        public async Task<IActionResult> GetSharedUsers()
        {
            var req = await _sharedUserRepository.GetUsersAsync();
            if(req == null)
            {
                return BadRequest("Share not Created");
            }

            var dto = req.Select(s => s.MapToUserWithEmailDTO());

            return Ok(dto);
        }
    }
}