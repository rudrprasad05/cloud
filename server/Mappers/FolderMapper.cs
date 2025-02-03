using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;
using server.Models.Requests;
using server.Models.Responses;

namespace server.Mappers
{
    public static class FolderMapper
    {
        public static Folder MapToFolder(this NewFolderRequest request)
        {
            ArgumentNullException.ThrowIfNull(request);
            return new Folder
            {
                Name = request.Name,
            };
        }

        public static GetOnlyFoldersReponse FromFolderToDTO(this Folder folders)
        {
            return new GetOnlyFoldersReponse
            {
                Id = folders.Id,
                Name = folders.Name,
                UserId = folders.UserId
            };
        }

        public static GetFolderWithMedia FromFolderToDTOWithMedia(this Folder folders)
        {
            return new GetFolderWithMedia
            {
                Id = folders.Id,
                Name = folders.Name,
                UserId = folders.UserId,
                Medias = folders.Medias.Select(media => media.FromMediaToDTO()).ToList()
            };
        }
    }
}