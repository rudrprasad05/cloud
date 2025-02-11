using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Interfaces;

namespace server.Services
{
    public class UserContextService : IUserContextService
    {
        private string? _userId;
        public void SetUserId(string userId) => _userId = userId;
        public string? GetUserId() => _userId;
    }
}