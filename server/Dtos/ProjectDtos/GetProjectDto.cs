using server.Models;

namespace server.Dtos.ProjectDtos;

public class GetProjectDto
{
    public Guid Id { get; set; }
    public required string ProjectName { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Logo { get; set; } = string.Empty;
    public ICollection<Section>? Sections { get; set; } 
}