using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace server.Models;

public class Section
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public int ProjectId { get; set; }
    public int? ParedntId { get; set; }
    public ICollection<Block>? Blocks { get; set; }
    [NotMapped]
    public Project? Project { get; set; }
}