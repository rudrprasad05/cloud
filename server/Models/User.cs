using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace server.Models
{
    public class User: IdentityUser
    {
        public List<Folder> Folders { get; set; } = [];
        public List<SharedUsers> SharedUsers { get; set; } = [];
       
    }
}