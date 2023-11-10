using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.BlockDtos;
using server.Services.BlockService;

namespace server.Controllers;

[Route("api/block/")]
[ApiController]
[EnableCors("AllowSpecificOrigin")]
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
    [Route("sectionId/{sectionId:guid}")]
    public async Task<ActionResult<List<GetBlockDto>>> GetBySectionId(Guid sectionId)
    {
        return Ok(await _blockService.GetAllBlocksBySectionId(sectionId));
    }

    [HttpGet]
    [Route("{id:guid}")]
    public async Task<ActionResult<GetBlockDto>> GetById(Guid id)
    {
        return Ok(await _blockService.GetBlockById(id));
    }

    [HttpPost]
    [Route("{sectionId:guid}")]
    public async Task AddBlock([FromBody]AddBlockDto newBlock, Guid sectionId)
    {
        await _blockService.AddBlock(newBlock,sectionId);
    }

    [HttpDelete]
    [Route("{id:guid}")]
    public async Task DeleteBlock(Guid id)
    {
        await _blockService.DeleteBlock(id);
    }

    [HttpPut]
    public async Task UpdateBlock(UpdateBlockDto updateBlock)
    {
        await _blockService.UpdateBlock(updateBlock);
    }
}