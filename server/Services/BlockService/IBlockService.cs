using server.Dtos.BlockDtos;
using server.Response;

namespace server.Services.BlockService;

public interface IBlockService
{
    Task<ApiResponse<List<GetBlockDto>>> GetAllBlocks();
    Task<ApiResponse<GetBlockDto>> GetBlockById(Guid id);
    Task<ApiResponse<List<GetBlockDto>>> GetAllBlocksBySectionId(Guid sectionId);
    Task AddBlock(AddBlockDto newBlock, Guid sectionId);
    Task UpdateBlock(List<UpdateBlockDto> updatedBlock);
    Task DeleteBlock(Guid id);
    Task<ApiResponse<List<GetBlockDto>>> SearchBlocks(string searchTerm, Guid projectId, int pageNumber);
}