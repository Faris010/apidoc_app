using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace server.Models;

public class Block
{
    public required int Id { get; set; }
    public string? Content { get; set; }
    public string? Image { get; set; }
    public int SortOrder { get; set; }
    public required int SectionId { get; set; }
    public required int BlockTypeId { get; set; }
    public BlockType? BlockTypes { get; set; }
    [NotMapped]
    public Section? Section { get; set; }
}