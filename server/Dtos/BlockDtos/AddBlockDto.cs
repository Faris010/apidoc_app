namespace server.Dtos.BlockDtos;

public class AddBlockDto 
{
    public string? Content { get; set; }
    public string? Image { get; set; }
    public int SortOrder { get; set; }
    public int BlockTypeId { get; set; }
}
