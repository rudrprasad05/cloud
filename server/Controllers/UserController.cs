using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : BaseController
    {
        private readonly UserManager<User> _userManager;

        public UserController(
            IConfiguration configuration, 
            ITokenService tokenService,
            UserManager<User> userManager

        ) : base(configuration, tokenService)
        {
            _userManager = userManager;

        }

        [HttpGet]
        [Authorize]
        public IActionResult GetUser()
        {
            var user = new
            {
                Name = User.Identity?.Name,
                Avatar = User.FindFirst("urn:github:avatar")?.Value
            };

            return Ok(user);
        }

        [HttpGet("get/{email}")]
        public async Task<IActionResult> GetShareWithMedia([FromRoute] string email)
        {
            var req = await _userManager.FindByEmailAsync(email);
            if(req == null)
            {
                return NotFound("Share not Created");
            }

            return Ok(req);
        }
    }
}