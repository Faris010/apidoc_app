using server.Dtos.SectionDtos;

namespace server.Services.SectionService;

public interface ISectionService
{
    Task<List<GetSectionDto>> GetAllSections();
    Task<GetSectionDto> GetSectionById(int id);
    Task AddSection(AddSectionDto newSection);
    Task UpdateSection(UpdateSectionDto updatedSection);
    Task DeleteSection(int id);
}