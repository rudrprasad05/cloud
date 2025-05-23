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
        public string Id { get; set; } = null!;
        public string Name { get; set; } = null!;
        public double? Size { get; set; } = null;
        public bool IsDeleted { get; set; } = false;
        public string Source { get; set; } = string.Empty;
        public string FolderId { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public Folder Folder { get; set; } = null!;
        public bool Star { get; set; } = false;
    }
}