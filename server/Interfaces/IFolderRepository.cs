using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;
using server.Models.Requests;

namespace server.Interfaces
{
    public interface IFolderRepository
    {
        public Task<Folder?> CreateAsync(Folder folder);
        public Task<List<Folder>?> GetAllWithoutAssociations(QueryObject queryObject);
        public Task<Folder?> GetOneWithMedia(string id);
        public Task<Folder?> MoveFolder(string id, string moveId);



    }
}