using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static server.Constants.Enum;

namespace server.Models.Responses
{
    public class GetOnlyMediaResponse
    {
        public MediaType Type { get; set; }
        public string Source { get; set; } = string.Empty;
        public string FolderId { get; set; } = null!;
        public DateTime CreatedAt { get; set; }

        
    }
}