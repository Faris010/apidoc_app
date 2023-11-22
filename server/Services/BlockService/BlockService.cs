using Mapster;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.BlockDtos;
using server.Models;
using server.Response;

namespace server.Services.BlockService;

public class BlockService : IBlockService
{
    private readonly DataContext _context;

    public BlockService(DataContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<GetBlockDto>>> GetAllBlocks()
    {
        var blocks = await _context.Blocks.Include(block => block.BlockTypes).ToListAsync();

        var blockDtos = blocks
            .Select(block => block.Adapt<GetBlockDto>())
            .OrderBy(b => b.SortOrder)
            .ToList();

        return new ApiResponse<List<GetBlockDto>>()
        {
            Success = true,
            Payload = blockDtos,
            ErrorCode = null
        };
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
            _context.SaveChanges();
        }
    }

    public async Task DeleteBlock(Guid id)
    {
        var block = await _context.Blocks.FindAsync(id);

        if (block != null)
        {
            _context.Blocks.Remove(block);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<ApiResponse<List<GetBlockDto>>> GetAllBlocksBySectionId(Guid sectionId)
    {
        var blocks = await _context.Blocks
        .Where(b => b.SectionId == sectionId)
        .Include(block => block.BlockTypes)
        .ToListAsync();

        if (blocks == null || !blocks.Any())
        {
            return new ApiResponse<List<GetBlockDto>>()
            {
                Success = false,
                ErrorCode = "Not Found",
                Payload = null
            };
        }

        var blockDtos = blocks
            .Select(block => block.Adapt<GetBlockDto>())
            .OrderBy(b => b.SortOrder)
            .ToList();

        return new ApiResponse<List<GetBlockDto>>()
        {
            Success = true,
            Payload = blockDtos,
            ErrorCode = null
        };
    }

    public async Task<ApiResponse<GetBlockDto>> GetBlockById(Guid id)

    {
        var dbBlock = await _context.Blocks
            .Where(block => block.Id == id)
            .Include(block => block.BlockTypes)
            .FirstOrDefaultAsync();

        if (dbBlock == null)
        {
            return new ApiResponse<GetBlockDto>()
            {
                Success = false,
                ErrorCode = "Not Found",
                Payload = null
            };
        }

        var block = dbBlock.Adapt<GetBlockDto>();
        return new ApiResponse<GetBlockDto>()
        {
            Success = true,
            Payload = block,
            ErrorCode = null
        };
    }

    public async Task UpdateBlock(List<UpdateBlockDto> updatedBlocks)
    {
        foreach (UpdateBlockDto updatedBlock in updatedBlocks)
        {
            var block = updatedBlock.Adapt<Block>();
            _context.Update(block);
        }
        await _context.SaveChangesAsync();
    }
}