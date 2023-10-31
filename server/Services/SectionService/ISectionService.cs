using Microsoft.AspNetCore.Mvc;
using server.Dtos.SectionDtos;
using server.Models;

namespace server.Services.SectionService;

public interface ISectionService
{
    Task<List<GetSectionDto>> GetAllSections();
    Task<GetSectionDto> GetSectionById(int id);
    Task AddSection(AddSectionDto newSection, int projectId);
    Task UpdateSection(UpdateSectionDto updatedSection);
    Task DeleteSection(int id);
}