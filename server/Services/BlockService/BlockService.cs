using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.BlockDtos;
using server.Models;

namespace server.Services.BlockService;

public class BlockService : IBlockService
{
    private readonly IMapper _mapper;
    private readonly DataContext _context;

    public BlockService(IMapper mapper, DataContext context)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task AddBlock(AddBlockDto newBlock, int sectionId)
    {
        var block = _mapper.Map<Block>(newBlock);
        var section = await _context.Sections.Where(s => s.Id == sectionId).Include(s => s.Blocks).FirstOrDefaultAsync();
        if (section is not null)
        {
            block.SectionId = sectionId;
            await _context.Blocks.AddAsync(block);
            section.Blocks?.Add(block);
            await _context.SaveChangesAsync();
        }
    }

    public async Task DeleteBlock(int id)
    {
        await _context.Blocks.Where(b => b.Id == id).ExecuteDeleteAsync();
    }

    public async Task<List<GetBlockDto>> GetAllBlocks()
    {
        var blocks = await _context.Blocks.Include(block => block.BlockTypes).ToListAsync();
        return blocks.Select(block => _mapper.Map<GetBlockDto>(block))
                .OrderBy(b => b.SortOrder).ToList();
    }

    public async Task<GetBlockDto> GetBlockById(int id)
    {
        var dbBlock = await _context.Blocks.Include(block => block.BlockTypes)
            .FirstOrDefaultAsync(block => block.Id == id);
        var block = _mapper.Map<GetBlockDto>(dbBlock);
        return block;
    }

    public async Task UpdateBlock(UpdateBlockDto updatedBlock)
    {
        var block = _mapper.Map<Block>(updatedBlock);
        if (block is null)
        {
            throw new Exception($"Project with Id '{updatedBlock.Id}' not found");
        }

        _context.Update(block);
        await _context.SaveChangesAsync();
    }
}