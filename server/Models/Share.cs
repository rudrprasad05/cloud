using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static server.Constants.Enum;

namespace server.Models
{
    public class Share : BaseModel
    {
        public ShareType Type { get; set; } = ShareType.PRIVATE;
        public string Url { get; set; } = string.Empty;
        public List<SharedUsers> SharedUsers { get; set; } = [];
        public string MediaId { get; set; } = null!;
        public Media Media { get; set; } = null!;

    }
}