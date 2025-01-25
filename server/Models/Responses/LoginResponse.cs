using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.Responses
{
    public class LoginResponse
    {
        public string Username{get; set;} = string.Empty;
        public string Email{get; set;} = string.Empty;
        public string Token{get; set;} = string.Empty;
    }
}