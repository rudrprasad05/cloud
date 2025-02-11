using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    public class BaseController : ControllerBase
    {
        protected string? UserId => HttpContext.Items["UserId"]?.ToString();
    }
}