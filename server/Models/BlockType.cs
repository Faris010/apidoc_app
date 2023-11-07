using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class BlockType 
{
    public int Id { get; set; }
    public string? Name { get; set; }
    [NotMapped]
    public Block? Block { get; set; }
}