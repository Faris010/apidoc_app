using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using server.Dtos.BlockTypeDtos;
using server.Services.BlockTypeService;

namespace server.Controllers
{
    [Route("/api/blocktype/")]
    public class BlockTypeController : ControllerBase
    {
        private readonly IBlockTypeService _blockTypeService;

        public BlockTypeController(IBlockTypeService blockTypeService)
        {
            _blockTypeService = blockTypeService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GetBlockTypeDto>>> GetAll()
        {
            return Ok(await _blockTypeService.GetAllBlockTypes());
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> GetBlockTypeById(int id)
        {
            return Ok(await _blockTypeService.GetBlockTypeById(id));
        }

        [HttpPost]
        public async Task UpdateBlockType(AddBlockTypeDto newBlockType)
        {
            await _blockTypeService.AddBlockType(newBlockType);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task DeleteBlockType(int id)
        {
            await _blockTypeService.DeleteBlockType(id);
        }

        [HttpPut]
        public async Task UpdateBlockType(UpdateBlockTypeDto updatedBlockType)
        {
            await _blockTypeService.UpdateBlockType(updatedBlockType);
        }
    }
}