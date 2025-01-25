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
                FolderId = request.FolderId,
                Type = request.Type,
                Source = request.Source
            };
        }

        public static GetOnlyMediaResponse FromMediaToDTO(this Media request)
        {
            ArgumentNullException.ThrowIfNull(request);
            return new GetOnlyMediaResponse
            {
                FolderId = request.FolderId,
                Type = request.Type,
                Source = request.Source,
                CreatedAt = request.CreatedAt
            };
        }
    }
}