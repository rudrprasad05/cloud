using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Resend;
using server.Interfaces;


namespace server.Services
{
    public class EmailService : IEmailService
    {
        private readonly IResend _resend;

        public EmailService(IResend resend)
        {
            _resend = resend;
            
        }
        public async Task<string> GenerateHTMLContent(string username, string confirmationLink)
        {
            // Load the template (ensure the file path is correct)
            var templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "email-confirmation-template.html");
            var template = await File.ReadAllTextAsync(templatePath);   
            // Replace placeholders with actual values
            template = template.Replace("{{username}}", username);
            template = template.Replace("{{confirmationLink}}", confirmationLink);

            return template; // Return the generated HTML
        }

        public async Task<bool> SendEmail(string to, string subject, string content)
        {
            var message = new EmailMessage {
                From = "no-reply@goshawkfiji.com", 
                To = to,
                Subject = subject,
                HtmlBody = content,
            };

            var email = await _resend.EmailSendAsync( message );
            if(email == null)
            {
                return false;
            }

            return true;
        }

    }
}