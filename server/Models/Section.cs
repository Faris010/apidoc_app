using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class Section
{
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    [ForeignKey("Project")]
    public int ProjectId { get; set; }
    public int? ParedntId { get; set; }
}