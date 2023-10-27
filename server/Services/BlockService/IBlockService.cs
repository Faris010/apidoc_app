using server.Dtos.BlockDtos;

namespace server.Services.BlockService;

public interface IBlockService
{
    Task<List<GetBlockDto>> GetAllBlocks();
    Task<GetBlockDto> GetBlockById(int id);
    Task AddBlock(AddBlockDto newBlock);
    Task UpdateBlock(UpdateBlockDto updatedBlock);
    Task DeleteBlock(int id);
}