using System.ComponentModel.DataAnnotations.Schema;

namespace server.Dtos.ProjectDtos;

public class GetProjectDto
{
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public string Id { get; set; }
    public required string ProjectName { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Logo { get; set; } = string.Empty;
}