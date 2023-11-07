namespace server.Dtos.SectionDtos
{
    public class AddSectionDto
    {
        public string Name { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public int? ParentId { get; set; }
        public Guid ProjectId { get; set; }
    }
}