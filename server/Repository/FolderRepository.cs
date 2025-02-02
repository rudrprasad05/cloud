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
        public FolderRepository(ApplicationDbContext context)
        {
            _context = context;
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
        public async Task<List<Folder>> GetAllWithoutAssociations(QueryObject queryObject)
        {
            var folders = _context.Folders.AsQueryable();

            if(!string.IsNullOrWhiteSpace(queryObject.UserId))
            {
                folders = folders.Where(s => s.UserId.Equals(queryObject.UserId));
            }

            if(!string.IsNullOrWhiteSpace(queryObject.FolderName))
            {
                folders = folders.Where(s => s.Name.Contains(queryObject.FolderName));
            }
            
            var pageSize = queryObject.PageSize;
            var skipNumber = (queryObject.PageNumber - 1) * pageSize;

            // return await folders.Skip(skipNumber).Take(pageSize).ToListAsync();
            return await folders.ToListAsync();

        }

        public Task<Folder?> GetOneWithMedia(string id)
        {
            var folder = _context.Folders
                .Include(f => f.Medias)
                .FirstOrDefaultAsync(f => f.Id == id);
                
            
            return folder;
        }
    }
}