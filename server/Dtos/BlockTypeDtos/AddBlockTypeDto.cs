using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server.Models;

namespace server.Dtos.BlockTypeDtos;

public class AddBlockTypeDto
{
    public required int Id { get; set; }
    public string? Name { get; set; }
}