using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IAmazonS3Service
    {
        Task<string?> UploadFileAsync(IFormFile file);

    }
}