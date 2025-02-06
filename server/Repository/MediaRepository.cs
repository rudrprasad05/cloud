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
        public async Task<Media?> CreateAsync(IFormFile file, string id)
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

        public async Task<List<Media>> GetAll()
        {
            var media = await _context.Medias.ToListAsync();
            return media;
        }
    }
}