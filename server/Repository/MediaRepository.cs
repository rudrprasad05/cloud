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
    public class MediaRepository : IMediaRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IAmazonS3Service _amazonS3Service;

        public MediaRepository(ApplicationDbContext context, IAmazonS3Service amazonS3Service)
        {
            _context = context;
            _amazonS3Service = amazonS3Service;

        }
        public async Task<Media?> CreateAsync(IFormFile file, string id, string? token)
        {
            if (file == null || id == null)
            {
                return null;
            }

            var fileUrl = await _amazonS3Service.UploadFileAsync(file);

            if(fileUrl == null)
            {
                return null;
            }

            var req = new NewMediaRequest{
                Type = Constants.Enum.MediaType.IMAGE,
                Source = fileUrl, 
                FolderId = id,
                Name = file.FileName,
                Size = file.Length
            };

            var newMedia = await _context.Medias.AddAsync(req.MapToMedia());
            await _context.SaveChangesAsync();
            if (newMedia == null)
            {
                return null;
            }

            return newMedia.Entity;   
        }

        public async Task<List<Media>?> GetAll(MediaQueryObject queryObject, string? userId)
        {
            if(string.IsNullOrEmpty(userId))
            {
                return null;
            }

            var media = _context.Medias.Include(m => m.Folder).AsQueryable();
            media = media.Where(m => m.Folder.UserId == userId);
            media = media.Where(s => s.IsDeleted.Equals(queryObject.IsDeleted));
            
            if(queryObject.IsStarred.HasValue)
            {
                media = media.Where(s => s.Star.Equals(queryObject.IsStarred));
            }
            

            var res = await media.ToListAsync();
            return res; 
        }

        public async Task<Media?> MoveMedia(string id, string moveId, string? token)
        {
            var folder = await _context.Medias.FirstOrDefaultAsync((i) => i.Id == id);
            if(folder == null)
            {
                return null;
            }

            folder.FolderId = moveId;

            await _context.SaveChangesAsync();
            return folder;
        }

        public async Task<Media?> Rename(string id, string name, string? token)
        {
            var media = await _context.Medias.FirstOrDefaultAsync((m) => m.Id == id);
            if(media == null)
            {
                return null;
            }
            
            media.Name = name;

            await _context.SaveChangesAsync();
            return media;
        }
        public async Task<Media?> Star(string id, bool star, string? token)
        {
            var media = await _context.Medias.FirstOrDefaultAsync((m) => m.Id == id);
            if(media == null)
            {
                return null;
            }
            
            media.Star = star;

            await _context.SaveChangesAsync();
            return media;
        }

        public async Task<Media?> GetOne(string id, string? token)
        {
            var mediaQ = _context.Medias.AsQueryable();
            var media = mediaQ.FirstOrDefaultAsync(m => m.Folder.UserId == token && m.Id == id);
            
            if(media == null)
            {
                return null;
            }

            return await media;
        }

        public async Task<Media?> Recycle(string id, string? token)
        {
            var media = await GetOne(id, token);
            if(media == null)
            {
                return null;
            }

            media.IsDeleted = !media.IsDeleted;
            await _context.SaveChangesAsync();
            return media;
        }

    }
}