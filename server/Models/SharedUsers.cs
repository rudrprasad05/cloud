using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class SharedUsers : BaseModel
    {
        public User User { get; set; } = null!;
        public Share Share { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public string ShareId { get; set; } = null!;

    }
}