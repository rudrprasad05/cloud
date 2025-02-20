using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;

namespace server.Controllers
{
    public class BaseController : ControllerBase
    {
        protected readonly IConfiguration _configuration;
        protected readonly ITokenService _tokenService;

        public BaseController(IConfiguration configuration, ITokenService tokenService)
        {
            _configuration = configuration;
            _tokenService = tokenService;
        }
        protected string? UserId => HttpContext.Items["UserId"]?.ToString();
    }
}