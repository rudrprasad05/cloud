using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;
using server.Models.Requests;

namespace server.Interfaces
{
    public interface IShareUserRepository
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="newSharedUser"></param>
        /// <returns>SharedUser | null</returns>
        public Task<SharedUsers?> CreateAsync(NewSharedUserRequest newSharedUser);
        public Task<List<Media>?> GetAsync();  
        public Task<Folder?> Star(string id, bool star);
        public Task<Folder?> Rename(string id, string name);



    }
}