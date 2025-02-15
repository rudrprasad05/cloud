using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;
using server.Models.Requests;


namespace server.Mappers
{
    public static class ShareMapper
    {
        public static Share MapToShare(this NewShareRequest request, string mediaId)
        {
            ArgumentNullException.ThrowIfNull(request);
            return new Share
            {
                Type = request.ShareType,
                Url = string.Empty,
                MediaId = mediaId

            };
        }
    }
}