using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.Requests
{
    public class NewSharedUserRequest
    {
        public string ShareId { get; set; } = null!;
    }
}