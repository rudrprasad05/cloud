using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.Responses
{
    public class NewSharedUserResponse
    {
        public string UserId { get; set; } = null!;
        public string ShareId { get; set; } = null!;
    }
}