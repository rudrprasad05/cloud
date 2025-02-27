using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Interfaces;
using server.Models;
using server.Models.Requests;

namespace server.Repository
{
    public class FolderRepository : IFolderRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IUserContextService _userContext;

        public FolderRepository(ApplicationDbContext context, IUserContextService userContext)
        {
            _context = context;
            _userContext = userContext;
        }
        public async Task<Folder?> CreateAsync(Folder folder)
        {
            try
            {
                var newFolder = await _context.Folders.AddAsync(folder);
                await _context.SaveChangesAsync();

                return newFolder.Entity;
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException?.Message.Contains("Duplicate entry") == true || 
                    ex.InnerException?.Message.Contains("UNIQUE constraint failed") == true)
                {
                    throw new Exception("A folder with the same name already exists.");
                }
                else
                {
                    Console.WriteLine("Database error: " + ex.Message);
                    throw;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            
        }
        public async Task<List<Folder>?> GetAllWithoutAssociations(QueryObject queryObject)
        {
            var userId = _userContext.GetUserId();
            var folders = _context.Folders.AsQueryable();

            if(userId == null)
            {
                return null;
            }

            if(!string.IsNullOrWhiteSpace(userId))
            {
                folders = folders.Where(s => s.UserId.Equals(userId));
            }

            if(!string.IsNullOrWhiteSpace(queryObject.FolderName))
            {
                folders = folders.Where(s => s.Name.Contains(queryObject.FolderName));
            }

            if(queryObject.IsParent == true)
            {
                folders = folders.Where(s => s.ParentId == null);
            }

            if(queryObject.IsStarred != null)
            {
                folders = folders.Where(s => s.Star == queryObject.IsStarred);
            }
            
            var pageSize = queryObject.PageSize;
            var skipNumber = (queryObject.PageNumber - 1) * pageSize;

            // return await folders.Skip(skipNumber).Take(pageSize).ToListAsync();
            return await folders.ToListAsync();

        }
        public async Task<Folder?> GetOneWithMedia(QueryObject queryObject, string id)
        {
            var folderQ = _context.Folders
                .Include(f => f.Medias.Where(m => !m.IsDeleted))
                    .ThenInclude(m => m.Share) // Include Share
                        .ThenInclude(s => s.SharedUsers) // Include SharedUsers
                            .ThenInclude(su => su.User) // Include User
                .Where(f => f.Id == id)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(queryObject.SharedUsername))
            {
                var normalizedUsername = queryObject.SharedUsername.Normalize();
                
                folderQ = folderQ.Where(f => f.Medias
                    .Any(m => m.Share != null && m.Share.SharedUsers
                        .Any(s => s.User.NormalizedUserName == normalizedUsername)));
            }

            return await folderQ.FirstOrDefaultAsync();
            /*
            var folderQ = _context.Folders
                .Include(f => f.Medias)
                    .ThenInclude(m => m.Share)
                        .ThenInclude(s => s.SharedUsers)
                            .ThenInclude(su => su.User) 
                .AsQueryable();

            folderQ = folderQ.Where(f => f.Id == id);
            folderQ = folderQ.Where(f => f.Medias.Any(m => m.IsDeleted == false));

            if(!string.IsNullOrWhiteSpace(queryObject.SharedUsername))
            {
                folderQ = folderQ
                    .Where(f => f.Medias
                    .Any(m => m.Share.SharedUsers
                    .Any(s => s.User.NormalizedUserName == queryObject.SharedUsername.Normalize())));
            }

            var res = await folderQ.FirstOrDefaultAsync();
            return res; 
            */
        
        }
        public async Task<Folder?> MoveFolder(string id, string moveId)
        {
            var folder = await _context.Folders.FirstOrDefaultAsync((i) => i.Id == id);
            if(folder == null)
            {
                return null;
            }

            if(moveId == "0")
            {
                folder.ParentId = null;
                await _context.SaveChangesAsync();
                return folder;
            }

            var parent = await _context.Folders.FirstOrDefaultAsync((i) => i.Id == moveId);
            if(parent == null)
            {
                return null;
            }
            
            folder.ParentId = parent.Id;
            
            await _context.SaveChangesAsync();
            return folder;

        }
        public async Task<Folder?> Rename(string id, string name)
        {
            var media = await _context.Folders.FirstOrDefaultAsync((m) => m.Id == id);
            if(media == null)
            {
                return null;
            }
            
            media.Name = name;

            await _context.SaveChangesAsync();
            return media;
        }
        public async Task<Folder?> Star(string id, bool star)
        {
            var media = await _context.Folders.FirstOrDefaultAsync((m) => m.Id == id);
            if(media == null)
            {
                return null;
            }
            
            media.Star = star;

            await _context.SaveChangesAsync();
            return media;
        }
    
    }
}