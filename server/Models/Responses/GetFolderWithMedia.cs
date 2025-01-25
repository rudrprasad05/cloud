using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.Responses
{
    public class GetFolderWithMedia
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string UserId { get; set; } = null!;
        public List<GetOnlyMediaResponse> Medias { get; set; } = [];
    }
}