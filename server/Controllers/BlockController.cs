using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.BlockDtos;
using server.Response;
using server.Services.BlockService;

namespace server.Controllers;

[Route("api/block/")]
[ApiController]
[Authorize]
[EnableCors("AllowSpecificOrigin")]
public class BlockController : ControllerBase
{
    private readonly IBlockService _blockService;

    public BlockController(IBlockService blockService)
    {
        _blockService = blockService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<GetBlockDto>), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(EmptyResult), (int)HttpStatusCode.NotFound)]
    public async Task<ActionResult<ApiResponse<List<GetBlockDto>>>> GetAll()
    {
        return await _blockService.GetAllBlocks();
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("sectionId/{sectionId:guid}")]
    [ProducesResponseType(typeof(GetBlockDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(EmptyResult), (int)HttpStatusCode.NotFound)]
    public async Task<ActionResult<ApiResponse<List<GetBlockDto>>>> GetBySectionId(Guid sectionId)
    {
        return await _blockService.GetAllBlocksBySectionId(sectionId);
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("{id:guid}")]
    [ProducesResponseType(typeof(GetBlockDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(EmptyResult), (int)HttpStatusCode.NotFound)]
    public async Task<ActionResult<ApiResponse<GetBlockDto>>> GetById(Guid id)
    {
        var payload = await _blockService.GetBlockById(id);
        return payload.Success ? Ok(payload) : BadRequest(payload);
    }

    [HttpPost]
    [Route("{sectionId:guid}")]
    public async Task AddBlock([FromBody] AddBlockDto newBlock, Guid sectionId)
    {
        await _blockService.AddBlock(newBlock, sectionId);
    }

    [HttpDelete]
    [Route("{id:guid}")]
    public async Task DeleteBlock(Guid id)
    {
        await _blockService.DeleteBlock(id);
    }

    [HttpPut]
    public async Task UpdateBlock([FromBody] List<UpdateBlockDto> updateBlock)
    {
        await _blockService.UpdateBlock(updateBlock);
    }
}