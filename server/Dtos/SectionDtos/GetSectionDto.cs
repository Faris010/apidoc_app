using server.Models;

namespace server.Dtos.SectionDtos;

public class GetSectionDto : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public Guid ProjectId { get; set; }
    public int? ParedntId { get; set; }
    public ICollection<Block>? Blocks { get; set; }
}