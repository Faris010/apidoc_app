using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Dtos.ProjectDtos;

public class UpdateProjectDto
{
    public required int Id { get; set; }
    public required string ProjectName { get; set; }
    public string Logo { get; set; } = string.Empty;
}