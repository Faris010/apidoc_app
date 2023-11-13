using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class Section : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public Guid ProjectId { get; set; }
    public Guid? ParentId { get; set; }
    public ICollection<Block>? Blocks { get; set; }
    [NotMapped]
    public Project? Project { get; set; }
}