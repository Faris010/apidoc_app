using System.ComponentModel.DataAnnotations.Schema;

namespace server.Dtos.BlockDtos;

public class GetBlockDto
{
    public int Id { get; set; }
    public string? Content { get; set; }
    public string? Image { get; set; }
    public int SortOrder { get; set; }
    [ForeignKey("Section")]
    public int SectionId { get; set; }
    public int BlockTypeId { get; set; }
}