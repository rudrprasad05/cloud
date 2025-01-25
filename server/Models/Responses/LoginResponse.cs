using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.Responses
{
    public class LoginResponse
    {
        [Required]
        public string Username{get; set;} = string.Empty;
        [Required]
        public string Email{get; set;} = string.Empty;
        [Required]
        public string Token{get; set;} = string.Empty;
    }
}