namespace server.Dtos.ProjectDtos;

public class AddProjectDto
{
    public required string ProjectName { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Logo { get; set; } = string.Empty;
}