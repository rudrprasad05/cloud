using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;
using server.Mappers;
using server.Models.Requests;

namespace server.Controllers
{
    [ApiController]
    [Route("api/folder")]
    public class FolderController : BaseController
    {
        private readonly IFolderRepository _folderRepository;

        public FolderController(IFolderRepository folderRepository, 
            ITokenService tokenService, 
            IConfiguration configuration
        ) : base(configuration, tokenService)
        {
            _folderRepository = folderRepository;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateFolder([FromBody] NewFolderRequest request)
        {
            var dto = request.MapToFolder();
            if (dto == null)
            {
                return BadRequest();
            }

            try
            {
                var userId = _tokenService.GetUserIdFromToken(HttpContext);
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "Invalid token or user ID missing." });
                }

                dto.UserId = userId;

                var newFolder = await _folderRepository.CreateAsync(dto);
                if (newFolder == null)
                {
                    return BadRequest(new { message = "Failed to create folder." });
                }

                return Ok(newFolder.FromFolderToDTO());
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("same name"))
                {
                    // Handle duplicate folder name exception
                    return Conflict(new { message = "A folder with the same name already exists." });
                }

                // Handle generic exceptions
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAllFolders([FromQuery] QueryObject queryObject)
        {
            var folders = await _folderRepository.GetAllWithoutAssociations(queryObject);
            if(folders == null){
                return BadRequest();
            }

            var dtos = folders.Select(f => f.FromFolderToDTO()).ToList();
            return Ok(dtos);
        }

        [HttpPost("move/{id}")]
        public async Task<IActionResult> MoveFolder([FromRoute] string id, [FromBody] MoveFolderRequest moveFolderRequest)
        {
            var folder = await _folderRepository.MoveFolder(id, moveFolderRequest.ToFolderId);
            if(folder == null)
            {
                return BadRequest();
            }

            return Ok(folder.FromFolderToDTO());
        }

        [HttpGet("get-one/{id}")]
        public async Task<IActionResult> GetOneFolder([FromRoute] string id, [FromQuery] QueryObject queryObject)
        {
            var folder = await _folderRepository.GetOneWithMedia(queryObject, id);
            if (folder == null)
            {
                return NotFound();
            }

            var dto = folder.FromFolderToDTOWithMedia();
            return Ok(dto);
        }

        [HttpPatch("star/{id}")]
        public async Task<IActionResult> Star([FromRoute] string id, [FromBody] StartMediaRequest request)
        {
            var media = await _folderRepository.Star(id, request.Star);

            return Ok(media);
        }

        [HttpPatch("rename/{id}")]
        public async Task<IActionResult> Rename([FromRoute] string id, [FromBody] RenameMediaRequest request)
        {
            var media = await _folderRepository.Rename(id, request.Name);
            if(media == null)
            {
                return BadRequest();
            }

            return Ok(media);
        }
        
    }
}