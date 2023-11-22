using server.Dtos.SectionDtos;
using server.Response;

namespace server.Services.SectionService;

public interface ISectionService
{
    Task<ApiResponse<GetSectionDto>> GetSectionById(Guid id);
    Task AddSection(AddSectionDto newSection, Guid projectId);
    Task<ApiResponse<List<GetSectionDto>>> GetSectionByProjectId(Guid projectId);
    Task UpdateSection(UpdateSectionDto updatedSection);
    Task DeleteSection(Guid id);
    Task<ApiResponse<List<GetSectionDto>>> SearchSections(string searchTerm, Guid projectId, int pageNumber);
}