using System.ComponentModel.DataAnnotations.Schema;

namespace server.Dtos.BlockTypeDtos;

public class AddBlockTypeDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
}