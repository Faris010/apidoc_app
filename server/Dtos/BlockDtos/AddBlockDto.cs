using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server.Models;

namespace server.Dtos.BlockDtos;

public class AddBlockDto
{

    public required int Id { get; set; }
    public string? Content { get; set; }
    public string? Image { get; set; }
    public int SortOrder { get; set; }
    public int BlockTypeId { get; set; }

}