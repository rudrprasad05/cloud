using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;
using server.Models.Requests;
using server.Models.Responses;

namespace server.Mappers
{
    public static class MediaMapper
    {
        public static Media MapToMedia(this NewMediaRequest request)
        {
            ArgumentNullException.ThrowIfNull(request);
            return new Media
            {
                Id = request.Id,
                FolderId = request.FolderId,
                Type = request.Type,
                Source = request.Source,
                Name = request.Name,
                Size = request.Size,
                ShareId = request.ShareId
            };
        }

        public static GetOnlyMediaResponse FromMediaWithFolderToDTO(this Media request)
        {
            ArgumentNullException.ThrowIfNull(request);
            return new GetOnlyMediaResponse
            {
                Id = request.Id,
                FolderId = request.FolderId,
                Type = request.Type,
                Source = request.Source,
                CreatedAt = request.CreatedAt,
                Name = request.Name,
                Size = request.Size,
                Folder = request.Folder.FromFolderToFolderName(),
                Star = request.Star,
                IsDeleted = request.IsDeleted
            };
        }

        public static GetOnlyMediaResponse FromMediaToDTO(this Media request)
        {
            ArgumentNullException.ThrowIfNull(request);
            return new GetOnlyMediaResponse
            {
                Id = request.Id,
                FolderId = request.FolderId,
                Type = request.Type,
                Source = request.Source,
                CreatedAt = request.CreatedAt,
                Name = request.Name,
                Size = request.Size,
                Star = request.Star,
                IsDeleted = request.IsDeleted
            };
        }

        public static Media FromMediaToMediaWithoutShare(this Media request)
        {
            ArgumentNullException.ThrowIfNull(request);
            return new Media
            {
                Id = request.Id,
                FolderId = request.FolderId,
                Type = request.Type,
                Source = request.Source,
                CreatedAt = request.CreatedAt,
                Name = request.Name,
                Size = request.Size,
                Star = request.Star,
                IsDeleted = request.IsDeleted
            };
        }
    }
}