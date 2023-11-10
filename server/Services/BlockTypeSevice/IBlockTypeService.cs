using server.Models;

namespace server.Services.BlockTypeSevice;

public interface IBlockTypeService
{
    Task <List<BlockType>> GetBlockTypes();
}