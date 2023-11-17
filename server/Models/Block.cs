using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class Block : BaseEntity
{
    public string? Content { get; set; } 
    public string? Image { get; set; }
    public int SortOrder { get; set; }
    public required Guid SectionId { get; set; }
    public required int BlockTypeId { get; set; }
    public BlockType? BlockTypes { get; set; }
    [NotMapped]
    public Section? Section { get; set; }
}