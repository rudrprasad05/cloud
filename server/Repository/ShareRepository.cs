using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Interfaces;
using server.Mappers;
using server.Models;
using server.Models.Requests;
using static server.Constants.Enum;

namespace server.Repository
{
    public class ShareRepository : IShareRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IUserContextService _userContext;

        public ShareRepository(ApplicationDbContext context, IUserContextService userContext)
        {
            _context = context;
            _userContext = userContext;
        }

        public async Task<Share?> CreateAsync(string id)
        {
            var exists = await _context.Share.FirstOrDefaultAsync(i => i.MediaId == id);
            if(exists != null)
            {
                return null;
            }

            var newShareRequest = new NewShareRequest{
                ShareType = ShareType.PRIVATE
            };

            var dto = newShareRequest.MapToShare(id);
            
            var res = await _context.Share.AddAsync(dto);
            await _context.SaveChangesAsync();

            return res.Entity;
        }
        public async Task<Share?> GetAsync(string id)
        {
            var exists = await _context.Share.FirstOrDefaultAsync(i => i.MediaId == id);
            return exists ?? null;
        }

        public async Task<Share?> GetAsyncWithMedia(string id)
        {
            var share = await _context.Share.Include(f => f.Media).FirstOrDefaultAsync(i => i.Id == id);
            if(share == null)
            {
                return null;
            }
            
            if(share.Type == ShareType.PRIVATE)
            {
                return null;
            }
            return share ;
        }

        public async Task<Share?> UpdateAsync(string id, UpdateShareRequest value)
        {
            var model = await _context.Share.FirstOrDefaultAsync(i => i.Id == id);
            if(model == null)
            {
                return null;
            }

            switch (value.Value.ToLower())
            {
                case "global": 
                    model.Type = ShareType.GLOBAL;
                    break;
                case "restricted": 
                    model.Type = ShareType.RESTRICTED;
                    break;
                case "private": 
                    model.Type = ShareType.PRIVATE;
                    break;
                default:
                    Console.WriteLine("Error");
                    break;
            }
            await _context.SaveChangesAsync();
            return model;
        }
    }
}