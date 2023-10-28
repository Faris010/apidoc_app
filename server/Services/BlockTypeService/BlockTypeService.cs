using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.BlockTypeDtos;
using server.Models;

namespace server.Services.BlockTypeService;

public class BlockTypeService : IBlockTypeService
{
    private readonly IMapper _mapper;
    private readonly DataContext _context;

    public BlockTypeService(IMapper mapper, DataContext context)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task AddBlockType(AddBlockTypeDto newBlockType)
    {
        var blockType = _mapper.Map<BlockType>(newBlockType);
        await _context.BlockTypes.AddAsync(blockType);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteBlockType(int id)
    {
        await _context.BlockTypes.Where(blocktype => blocktype.Id == id).ExecuteDeleteAsync();
    }

    public async Task<List<GetBlockTypeDto>> GetAllBlockTypes()
    {
        var blockTypes = await _context.BlockTypes.ToListAsync();
        return blockTypes.Select(blockType => _mapper.Map<GetBlockTypeDto>(blockType)).ToList();
    }

    public async Task<GetBlockTypeDto> GetBlockTypeById(int id)
    {
        var dbBlockType = await _context.BlockTypes.FindAsync(id);
        var blockType = _mapper.Map<GetBlockTypeDto>(dbBlockType);
        return blockType;
    }

    public async Task UpdateBlockType(UpdateBlockTypeDto updatedBlockType)
    {
        var blockType = _mapper.Map<BlockType>(updatedBlockType);
        if (blockType is null)
        {
            throw new Exception($"Project with Id '{updatedBlockType.Id}' not found");
        }

        _context.Update(blockType);
        await _context.SaveChangesAsync();
    }
}