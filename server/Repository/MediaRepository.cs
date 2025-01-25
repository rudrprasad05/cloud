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
    public class MediaRepository : IMediaRepository
    {
        private readonly ApplicationDbContext _context;
        public MediaRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Media?> CreateAsync(Media media)
        {
            await _context.Medias.AddAsync(media);
            await _context.SaveChangesAsync();
            return media;
        }

        public async Task<List<Media>> GetAll()
        {
            var media = await _context.Medias.ToListAsync();
            return media;
        }
    }
}