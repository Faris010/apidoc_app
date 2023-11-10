using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services.BlockTypeSevice;

namespace server.Controllers;

[Route("/api/blocktype/")]
[ApiController]
[EnableCors("AllowSpecificOrigin")]
public class BlockTypeController : Controller
{
    private readonly IBlockTypeService _blockTypeService;

    public BlockTypeController(IBlockTypeService blockTypeService)
    {
        _blockTypeService = blockTypeService;
    }

    [HttpGet]
    public async Task<List<BlockType>> GetBlockTypesAsync()
    {
        return await _blockTypeService.GetBlockTypes();
    }
}