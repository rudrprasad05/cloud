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

            var newFolder = await _folderRepository.CreateAsync(dto);
            if (newFolder == null)
            {
                return BadRequest();
            }
            return Ok(newFolder);
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAllFolders()
        {
            var folders = await _folderRepository.GetAllWithoutAssociations();
            var dtos = folders.Select(f => f.FromFolderListToDTO()).ToList();
            return Ok(dtos);
        }
    }
}