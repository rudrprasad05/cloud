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
    public class FolderController : ControllerBase
    {
        IFolderRepository _folderRepository;

        public FolderController(IFolderRepository folderRepository) 
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
        public async Task<IActionResult> GetAllFolders()
        {
            var folders = await _folderRepository.GetAllWithoutAssociations();
            var dtos = folders.Select(f => f.FromFolderToDTO()).ToList();
            return Ok(dtos);
        }

        [HttpGet("get-one/{id}")]
        public async Task<IActionResult> GetOneFolder([FromRoute] string id)
        {
            var folder = await _folderRepository.GetOneWithMedia(id);
            if (folder == null)
            {
                return NotFound();
            }

            var dto = folder.FromFolderToDTOWithMedia();
            return Ok(dto);
        }
    }
}