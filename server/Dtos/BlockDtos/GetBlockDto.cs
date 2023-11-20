using server.Models;

namespace server.Dtos.BlockDtos;

public class GetBlockDto : BaseEntity
{
    public string? Content { get; set; }
    public string? Image { get; set; }
    public int SortOrder { get; set; }
    public string? Language { get; set; }
    public required Guid SectionId { get; set; }
    public int BlockTypeId { get; set; }
    public BlockType? BlockTypes { get; set; }
}