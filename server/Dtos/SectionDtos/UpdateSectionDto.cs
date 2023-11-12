namespace server.Dtos.SectionDtos;

public class UpdateSectionDto
{
    public required Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public Guid ProjectId { get; set; }
    public Guid? ParentId { get; set; }
}