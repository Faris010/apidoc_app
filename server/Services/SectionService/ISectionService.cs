using server.Dtos.SectionDtos;

namespace server.Services.SectionService;

public interface ISectionService
{
    Task<List<GetSectionDto>> GetAllSections();
    Task<GetSectionDto> GetSectionById(Guid id);
    Task AddSection(AddSectionDto newSection, Guid projectId);
    Task<List<GetSectionDto>> GetSectionByProjectId(int projectId);

    Task UpdateSection(UpdateSectionDto updatedSection);
    Task DeleteSection(Guid id);
}