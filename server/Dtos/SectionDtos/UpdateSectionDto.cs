namespace server.Dtos.SectionDtos;

public class UpdateSectionDto
{
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public Guid ProjectId { get; set; }
    public int? ParedntId { get; set; }
}