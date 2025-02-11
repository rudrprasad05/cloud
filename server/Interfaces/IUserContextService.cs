using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IUserContextService
    {
        public void SetUserId(string userId);
        public string? GetUserId();
    }
}