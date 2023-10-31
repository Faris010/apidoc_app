using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace server.Models;

public class BlockType
{
    public required int Id { get; set; }
    public string? Name { get; set; }
    public Block? Block { get; set; }
}