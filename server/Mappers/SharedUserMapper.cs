using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;
using server.Models.Requests;
using server.Models.Responses;

namespace server.Mappers
{
    public static class SharedUserMapper
    {
        public static SharedUsers FromDTOToModel(this NewSharedUserRequest request, string userId)
        {
            ArgumentNullException.ThrowIfNull(request);
            return new SharedUsers
            {
                ShareId = request.ShareId,
                UserId = userId
            };
        }

        public static NewSharedUserResponse FromModelToDTO(this SharedUsers request)
        {
            ArgumentNullException.ThrowIfNull(request);
            return new NewSharedUserResponse
            {
                ShareId = request.ShareId,
                UserId = request.UserId,
            };
        }
    }
}