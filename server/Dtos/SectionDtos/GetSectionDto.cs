using System.ComponentModel.DataAnnotations.Schema;
using server.Models;

namespace server.Dtos.SectionDtos;

public class GetSectionDto
{
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    [ForeignKey("Project")]
    public int ProjectId { get; set; }
    public int? ParedntId { get; set; }
    public ICollection<Block>? Blocks { get; set; }
}