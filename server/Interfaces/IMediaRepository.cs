using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;
using server.Models.Requests;

namespace server.Interfaces
{
    public interface IMediaRepository
    {
        public Task<Media?> CreateAsync(IFormFile file, string id);

        public Task<List<Media>> GetAll(MediaQueryObject queryObject);

        public Task<Media?> Star(string id, bool star);


        
    }
}