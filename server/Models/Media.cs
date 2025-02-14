using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using static server.Constants.Enum;

namespace server.Models
{
    public class Media : BaseModel
    {
        [Required]
        [Column(TypeName = "varchar(20)")]
        public MediaType Type { get; set; }
        public string Source { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public Folder Folder { get; set; } = null!;
        public string FolderId { get; set; } = null!;
        public double? Size {get; set; } = null;
        public bool Star { get; set; } = false;
        public bool IsDeleted { get; set; } = false;

    }
}