using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services.BlockTypeSevice;

public class BlockTypeService : IBlockTypeService
{
    private readonly DataContext _context;

    public BlockTypeService(DataContext context)
    {
        _context = context;
    }
    public async Task<List<BlockType>> GetBlockTypes()
    {
        return await _context.BlockTypes.ToListAsync();
    }
}