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
                ParentId = request.ParentId ?? null
            };
        }

        public static GetOnlyFoldersReponse FromFolderToDTO(this Folder folders)
        {
            return new GetOnlyFoldersReponse
            {
                Id = folders.Id,
                Name = folders.Name,
                UserId = folders.UserId,
                ParentId = folders.ParentId,
                Star = folders.Star
            };
        }

        public static GetFolderWithMedia FromFolderToDTOWithMedia(this Folder folders)
        {
            return new GetFolderWithMedia
            {
                Id = folders.Id,
                Name = folders.Name,
                UserId = folders.UserId,
                Medias = folders.Medias.Select(media => media.FromMediaWithFolderToDTO()).ToList(),
                Children = folders.Children.Select(child => child.FromFolderToDTO()).ToList()
            };
        }

        public static Folder FromFolderToFolderName(this Folder folders)
        {
            return new Folder
            {
                Id = folders.Id,
                Name = folders.Name,
                UserId = folders.UserId,
                Children = [],
                Medias = [],
                ParentId = string.Empty,

            };
        }
    }
}