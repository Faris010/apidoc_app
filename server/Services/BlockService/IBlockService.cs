using server.Dtos.BlockDtos;

namespace server.Services.BlockService;

public interface IBlockService
{
    Task<List<GetBlockDto>> GetAllBlocks();
    Task<List<GetBlockDto>> GetAllBlocksBySectionId(Guid sectionId);
    Task<GetBlockDto> GetBlockById(Guid id);
    Task AddBlock(AddBlockDto newBlock, Guid sectionId);
    Task UpdateBlock(UpdateBlockDto updatedBlock);
    Task DeleteBlock(Guid id);
}