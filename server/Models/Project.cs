using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class Project : BaseEntity
{
    public string ProjectName { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Logo { get; set; } = string.Empty;
    public ICollection<Section>? Sections { get; set; }
}

public class BaseEntity
{
    [Key]
    public Guid Id { get; set; }
    public bool IsDeleted { get; set; }
}