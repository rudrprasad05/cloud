using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Interfaces;
using server.Models;

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
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
            
        }
        public async Task<List<Folder>> GetAllWithoutAssociations()
        {
            var folders = await _context.Folders.ToListAsync();

            return folders; 
        }
    }
}