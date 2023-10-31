using Microsoft.AspNetCore.Mvc;
using server.Dtos.BlockDtos;
using server.Services.BlockService;

namespace server.Controllers;

[Route("api/block/")]
public class BlockController : ControllerBase
{
    private readonly IBlockService _blockService;

    public BlockController(IBlockService blockService)
    {
        _blockService = blockService;
    }

    [HttpGet]
    public async Task<ActionResult<List<GetBlockDto>>> GetAll()
    {
        return Ok(await _blockService.GetAllBlocks());
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<GetBlockDto>> GetById(int id)
    {
        return Ok(await _blockService.GetBlockById(id));
    }

    [HttpPost]
    [Route("{sectionId}")]
    public async Task AddBlock([FromBody]AddBlockDto newBlock, int sectionId)
    {
        await _blockService.AddBlock(newBlock,sectionId);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task DeleteBlock(int id)
    {
        await _blockService.DeleteBlock(id);
    }

    [HttpPut]
    public async Task UpdateBlock(UpdateBlockDto updateBlock)
    {
        await _blockService.UpdateBlock(updateBlock);
    }
}