using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

public class Project
{
    [Key]
    public int Id { get; set; }
    public string ProjectName { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Logo { get; set; } = string.Empty;
    public ICollection<Section>? Sections { get; set; }
}