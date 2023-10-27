using System.ComponentModel.DataAnnotations.Schema;

namespace server.Dtos.ProjectDtos;

public class AddProjectDto
{
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public required string Id { get; set; }
    public required string ProjectName { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Logo { get; set; } = string.Empty;
}