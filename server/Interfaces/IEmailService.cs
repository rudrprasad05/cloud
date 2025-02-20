using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IEmailService
    {
        public Task<string> GenerateHTMLContent(string username, string confirmationLink);
        public Task<bool> SendEmail(string from, string subject, string content);

        
    }
}