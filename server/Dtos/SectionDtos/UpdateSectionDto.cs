using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server.Models;

namespace server.Dtos.SectionDtos;

public class UpdateSectionDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public int ProjectId { get; set; }
    public int? ParedntId { get; set; }
}