namespace server.Dtos.ProjectDtos;

public class UpdateProjectDto 
{
    public required Guid Id { get; set; }
    public required string ProjectName { get; set; }
    public string Logo { get; set; } = string.Empty;
}