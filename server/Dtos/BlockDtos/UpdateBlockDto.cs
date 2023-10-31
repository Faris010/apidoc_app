using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server.Models;

namespace server.Dtos.BlockDtos;

public class UpdateBlockDto
{
    public required int Id { get; set; }
    public string? Content { get; set; }
    public string? Image { get; set; }
    public required int SortOrder { get; set; }
    public int SectionId { get; set; }
    public int BlockTypeId { get; set; }
}