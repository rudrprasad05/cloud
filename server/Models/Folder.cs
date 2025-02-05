using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Folder : BaseModel
    {
        public string Name { get; set; } = string.Empty;
        public Folder? Parent { get; set; }
        public string? ParentId { get; set; }
        public List<Folder> Children { get; set; } = [];
        public List<Media> Medias { get; set; } = [];
        public User User { get; set; } = null!;
        public string UserId { get; set; } = null!;
    }
}