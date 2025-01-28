using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;
using server.Models;
using server.Models.Requests;
using server.Models.Responses;

namespace server.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        [ProducesResponseType(typeof(LoginResponse), 200)]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {
            try
            {
                if(!ModelState.IsValid) return BadRequest(ModelState);

                var user = new User { UserName = model.Username,Email = model.Email };
                var result = await _userManager.CreateAsync(user, model.Password);
                
                if (result.Succeeded)
                {
                    var role = await _userManager.AddToRoleAsync(user, "User");
                    if (role.Succeeded)
                    {
                        return Ok(
                            new LoginResponse
                            {
                                Username = user.UserName,
                                Email = user.Email,
                                Token = _tokenService.CreateToken(user) 
                            }
                        );
                    }
                    else
                    {
                        return BadRequest(role.Errors);
                    }
                }
                return BadRequest(result.Errors);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var user = await _userManager.FindByNameAsync(model.Username);
                if (user == null)
                {
                    return Unauthorized("Invalud username");
                }
                var result = await _signInManager.CheckPasswordSignInAsync (user, model.Password, false);
                if(!result.Succeeded)
                {
                    return Unauthorized("Username or password is incorrect");
                }
                
                return Ok(
                    new LoginResponse
                    {
                        Username = user.UserName,
                        Email = user.Email,
                        Token = _tokenService.CreateToken(user),
                    }
                );

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("secure")]
        [Authorize]
        public IActionResult GetSecureData()
        {
            return Ok("This is a secure endpoint!");
        }
    
    }
}

