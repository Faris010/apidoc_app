using System.ComponentModel.DataAnnotations.Schema;

namespace server.Dtos.ProjectDtos;

public class UpdateProjectDto
{
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public string Id { get; set; }
    public required string ProjectName { get; set; }
    public string Logo { get; set; } = string.Empty;
}