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
        public Task<Media?> CreateAsync(IFormFile file, string id, string? token);
        public Task<List<Media>?> GetAll(MediaQueryObject queryObject, string? token);
        public Task<Media?> Star(string id, bool star, string? token);
        public Task<Media?> Rename(string id, string name, string? token);
        public Task<Media?> MoveMedia(string id, string moveId, string? token);
        public Task<Media?> GetOne(string id, string? token);
        public Task<Media?> Recycle(string id, string? token);   
        public Task<Media?> Delete(string id, string? token);   
        public Task<double> SumStorage(string userId);
    }
}