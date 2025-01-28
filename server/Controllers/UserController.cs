using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
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
    }
}