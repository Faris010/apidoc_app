using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class Project
{
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public int Id { get; set; }
    public string ProjectName { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Logo { get; set; } =string.Empty;
}