namespace server.Dtos.BlockDtos;

public class UpdateBlockDto
{
    public Guid Id { get; set; }
    public string? Content { get; set; }
    public string? Image { get; set; }
    public string? Language { get; set; }
    public required int SortOrder { get; set; }
    public Guid SectionId { get; set; }
    public int BlockTypeId { get; set; }
}