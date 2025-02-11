using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.Requests
{
    public class NewFolderRequest
    {
        public string Name { get; set; } = null!;
        public string? ParentId { get; set; }

    }
    public class MoveFolderRequest
    {
        public string Id { get; set; } = null!;
        public string ToFolderId { get; set; } = null!;

    }
}