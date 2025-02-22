using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.Requests
{
    public class QueryObject
    {
        public string? UserId { get; set; } = null;
        public string? FolderName { get; set;} = null;
        public string? ParentId { get; set;} = string.Empty;
        public bool? IsParent { get; set;} = false;
        public string? SortBy { get; set; } = null;
        public bool IsDescending { get; set; } = false;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set;} = 10;
        public bool? IsStarred { get; set; } = null;
        public string? SharedUsername { get; set; } = null;
    }
}