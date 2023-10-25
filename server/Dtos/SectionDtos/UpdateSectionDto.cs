using System.ComponentModel.DataAnnotations.Schema;
using server.Models;

namespace server.Dtos.SectionDtos;

public class UpdateSectionDto
{
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    [ForeignKey("Project")]
    public int ProjectId { get; set; }
    public ICollection<Section>? Children { get; set; }
}