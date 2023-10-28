using server.Dtos.BlockTypeDtos;

namespace server.Services.BlockTypeService;

public interface IBlockTypeService
{
    Task<List<GetBlockTypeDto>> GetAllBlockTypes();
    Task<GetBlockTypeDto> GetBlockTypeById(int id);
    Task AddBlockType(AddBlockTypeDto newBlockType);
    Task UpdateBlockType(UpdateBlockTypeDto updatedBlockType);
    Task DeleteBlockType(int id);
}