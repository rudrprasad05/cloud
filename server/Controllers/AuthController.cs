using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Resend;
using server.Interfaces;
using server.Mappers;
using server.Models;
using server.Models.Requests;
using server.Models.Responses;
using server.Services;

namespace server.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/auth")]
    public class AuthController : BaseController
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IEmailService _emailService;
        private readonly IFolderRepository _folderRepository;


        public AuthController(IEmailService emailService, 
            IFolderRepository folderRepository, 
            UserManager<User> userManager, 
            SignInManager<User> signInManager, 
            IConfiguration configuration, 
            ITokenService tokenService
        ) : base(configuration, tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailService = emailService;
            _folderRepository = folderRepository;
        }

        [HttpPost("confirm-email/{id}")]
        [ProducesResponseType(typeof(string), 200)]
        public async Task<IActionResult> ConfirmEmail([FromRoute] string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Unauthorized("Invalud username");
            }

            if(user.EmailConfirmed)
            {
                return Ok("Email already confirmed");
            }
            
            user.EmailConfirmed = true;
            await _userManager.UpdateAsync(user);
            return Ok("Email confirmed");
        }

        [HttpPost("register")]
        [ProducesResponseType(typeof(LoginResponse), 200)]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {
            try
            {
                if(!ModelState.IsValid) return BadRequest(ModelState);

                var user = new User { UserName = model.Username, Email = model.Email };
                var result = await _userManager.CreateAsync(user, model.Password);

                var request = new NewFolderRequest {Name="home", ParentId=null};
                var dto = request.MapToFolder();
                dto.UserId = user.Id;
                var newFolder = await _folderRepository.CreateAsync(dto);

                if (result.Succeeded)
                {
                    var role = await _userManager.AddToRoleAsync(user, "User");
                    if (role.Succeeded)
                    {
                        var token = _tokenService.CreateToken(user);
                        var cookieOptions = new CookieOptions
                        {
                            HttpOnly = true,
                            Secure = true, // Ensure secure transmission over HTTPS
                            SameSite = SameSiteMode.None,
                            Expires = DateTime.UtcNow.AddDays(7) // Set expiration
                        };

                        Response.Cookies.Append("token", token, cookieOptions);
                        var link = _configuration["FrontEnd:Url"] + "confirm-email?token=" + user.Id;
                        var content = await _emailService.GenerateHTMLContent(user.UserName, link);
                        var sendEmail = await _emailService.SendEmail(user.Email, "Welcome to your Cloud", content);
                        if(!sendEmail)
                        {
                            return BadRequest("Email not sent");
                        }

                        return Ok(
                            new LoginResponse
                            {
                                Username = user.UserName,
                                Email = user.Email,
                                Token = token
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

                var tokenString = _tokenService.CreateToken(user);

                Response.Cookies.Append("token", tokenString, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,  // Set to false for local development
                    SameSite = SameSiteMode.None,
                    Expires = DateTime.UtcNow.AddHours(1)
                });
                
                return Ok(
                    new LoginResponse
                    {
                        Username = user.UserName ?? string.Empty,
                        Email = user.Email ?? string.Empty,
                        Id = user.Id,
                        Token = tokenString,
                    }
                );

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("me")]
        [Authorize] // Requires Authentication
        public async Task<IActionResult> GetCurrentUser()
        {
            try
            {
                var authHeader = Request.Headers["Authorization"].FirstOrDefault();
                if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                {
                    return Unauthorized(new { message = "Token missing or invalid" });
                }

                var token = authHeader.Substring(7); 
                var handler = new JwtSecurityTokenHandler();
                var jwtToken = handler.ReadJwtToken(token);

                var email = jwtToken.Claims.FirstOrDefault(c => c.Type == "email")?.Value;
                if (string.IsNullOrEmpty(email))
                {
                    return Unauthorized(new { message = "Invalid token" });
                }

                var user = await _userManager.FindByEmailAsync(email);
                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                return Ok(new LoginResponse
                {
                    Id = user.Id,
                    Email = user.Email ?? string.Empty,
                    Username = user.UserName ?? string.Empty,
                    Token = token
                });
            }
            catch
            {
                return Unauthorized(new { message = "Invalid or expired token" });
            }
        }

      
    
    }
}

