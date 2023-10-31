using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server.Models;

namespace server.Dtos.BlockDtos;

public class GetBlockDto
{
  
    public required int Id { get; set; }
    public string? Content { get; set; }
    public string? Image { get; set; }
    public int SortOrder { get; set; }
    public required int SectionId { get; set; }
    public int BlockTypeId { get; set; }
    public BlockType? BlockTypes { get; set; }
}