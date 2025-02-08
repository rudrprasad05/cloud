using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.Responses
{
    public class GetFolderWithoutChildrenOrMedia
    {
        public string Name { get; set; } = string.Empty;
        public Folder? Parent { get; set; } = null;
        public string? ParentId { get; set; } = null;
        public List<Folder> Children { get; set; } = [];
        public List<Media> Medias { get; set; } = [];
        public User User { get; set; } = null!;
        public string UserId { get; set; } = null!;
    }
}