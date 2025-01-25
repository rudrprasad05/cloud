using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.Requests
{
    public class LoginRequest
    {
        public LoginRequest()
        {
            
        }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}