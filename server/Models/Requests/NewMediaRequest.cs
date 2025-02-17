using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static server.Constants.Enum;

namespace server.Models.Requests
{
    public class NewMediaRequest
    {
        public MediaType Type { get; set; }
        public string Source { get; set; } = string.Empty;
        public string FolderId { get; set; } = null!;
        public string Id { get; set; } = null!;
        public string ShareId { get; set; } = null!;
        public string Name { get; set; } = null!;
        public double? Size {get; set; } = null;

    }
}