using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;
using server.Models.Responses;

namespace server.Mappers
{
    public static class UserMapper
    {
        public static GetUserWithNameAndEmail MapToUserWithEmailDTO(this User request)
        {
            ArgumentNullException.ThrowIfNull(request);
            return new GetUserWithNameAndEmail
            {
                Username = request.UserName ?? string.Empty,
                Email = request.Email ?? string.Empty,
                Id = request.Id ?? string.Empty,
            };
        }
    }
}