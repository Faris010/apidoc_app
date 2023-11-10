using Mapster;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.BlockDtos;
using server.Models;

namespace server.Services.BlockService;

public class BlockService : IBlockService
{
    private readonly DataContext _context;

    public BlockService(DataContext context)
    {
        _context = context;
    }

    public async Task AddBlock(AddBlockDto newBlock, Guid sectionId)
    {
        var block = newBlock.Adapt<Block>();
        block.Id = Guid.NewGuid();
        var section = await _context.Sections.Where(s => s.Id == sectionId).Include(s => s.Blocks).FirstOrDefaultAsync();
        if (section is not null)
        {
            block.SectionId = sectionId;
            await _context.Blocks.AddAsync(block);
            section.Blocks?.Add(block);
            await _context.SaveChangesAsync();
        }
    }

    public async Task DeleteBlock(Guid id)
    {
        await _context.Blocks.Where(b => b.Id == id).ExecuteDeleteAsync();
    }

    public async Task<List<GetBlockDto>> GetAllBlocks()
    {
        var blocks = await _context.Blocks.Include(block => block.BlockTypes).ToListAsync();
        return blocks.Select(block => block.Adapt<GetBlockDto>())
                .OrderBy(b => b.SortOrder).ToList();
    }

    public async Task<List<GetBlockDto>> GetAllBlocksBySectionId(Guid sectionId)
    {
        var blocks = await _context.Blocks.Where(b => b.SectionId == sectionId).Include(block => block.BlockTypes).ToListAsync();
        return blocks.Select(block => block.Adapt<GetBlockDto>())
                .OrderBy(b => b.SortOrder).ToList();
    }

    public async Task<GetBlockDto> GetBlockById(Guid id)
    {
        var dbBlock = await _context.Blocks.Where(block => block.Id == id).Include(block => block.BlockTypes)
            .FirstOrDefaultAsync();
        var block = dbBlock.Adapt<GetBlockDto>();
        return block;
    }

    public async Task UpdateBlock(UpdateBlockDto updatedBlock)
    {
        var block = updatedBlock.Adapt<Block>();
        _context.Update(block);
        await _context.SaveChangesAsync();
    }
}