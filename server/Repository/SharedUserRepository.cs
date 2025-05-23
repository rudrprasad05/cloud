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

namespace server.Repository
{
    public class SharedUserRepository : IShareUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IUserContextService _userContext;

        public SharedUserRepository(ApplicationDbContext context, IUserContextService userContext)
        {
            _context = context;
            _userContext = userContext;



        }
        public async Task<SharedUsers?> CreateAsync(NewSharedUserRequest newSharedUser)
        {
            var userId = _userContext.GetUserId();
            if(userId == null)
            {
                return null;
            }

            var exists = await _context.SharedUsers.FirstOrDefaultAsync(f => f.UserId == userId && f.ShareId == newSharedUser.ShareId);
            if(exists != null)
            {
                return exists;
            }
            
            var model = newSharedUser.FromDTOToModel(userId);
            var create = await _context.SharedUsers.AddAsync(model);
            if(create == null)
            {
                return null;
            }
            await _context.SaveChangesAsync();

            return create.Entity;
        }
        public async Task<List<Media>?> GetAsync()
        {
            var userId = _userContext.GetUserId();
            if(userId == null)
            {
                return null;
            }

            var mediaList = await _context.SharedUsers
            .Include(su => su.Share)
                .ThenInclude(share => share.Media)
            .Where(su => su.UserId == userId)
            .Select(su => su.Share.Media)
            .ToListAsync();

            return mediaList;
        }

        public async Task<List<User>?> GetUsersAsync()
        {
            var userId = _userContext.GetUserId();
            if(userId == null)
            {
                return null;
            }

            var userList = await _context.SharedUsers
                .Include(su => su.Share.Media.Folder.User)
                .Where(su => su.UserId == userId)
                .Select(su => su.Share.Media.Folder.User)
                .ToListAsync();
            
            return userList;
        }

        public async Task<SharedUsers?> CreateWithIdAsync(NewSharedUserWithIdRequest newSharedUser)
        {
            var exists = await _context.SharedUsers.FirstOrDefaultAsync(f => f.UserId == newSharedUser.UserId && f.ShareId == newSharedUser.ShareId);
            if(exists != null)
            {
                return exists;
            }
            
            var model = newSharedUser.FromNewSharedUserWithIdRequestToModel();
            var create = await _context.SharedUsers.AddAsync(model);
            if(create == null)
            {
                return null;
            }
            await _context.SaveChangesAsync();

            return create.Entity;
        }
        public Task<Folder?> Rename(string id, string name)
        {
            throw new NotImplementedException();
        }

        public Task<Folder?> Star(string id, bool star)
        {
            throw new NotImplementedException();
        }

        public async Task<List<User>?> GetUsersByShareIdAsync(string shareId)
        {
            var userList = await _context.SharedUsers
                .Include(su => su.User)
                .Where(su => su.ShareId == shareId)
                .Select(su => su.User)
                .ToListAsync();
            return userList;
        }
    }
}