using Mapster;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.SectionDtos;
using server.Models;

namespace server.Services.SectionService;

public class SectionService : ISectionService
{

    private readonly DataContext _contex;

    public SectionService(DataContext context)
    {
        _contex = context;
    }
    public async Task AddSection(AddSectionDto newSection, Guid projectId)
    {
        var section = newSection.Adapt<Section>();
        section.Id = Guid.NewGuid();
        var project = await _contex.Projects.Where(p => p.Id == projectId).Include(p => p.Sections).FirstOrDefaultAsync();
        if (project is not null)
        {
            section.ProjectId = projectId;
            await _contex.Sections.AddAsync(section);
            project.Sections?.Add(section);
            await _contex.SaveChangesAsync();
        }
    }

    public async Task DeleteSection(Guid id)
    {
        await _contex.Sections.Where(section => section.Id == id).ExecuteDeleteAsync();
    }

    public async Task<List<GetSectionDto>> GetAllSections()
    {
        return await _contex.Sections.Include(section => section.Blocks).Select(section =>
        section.Adapt<GetSectionDto>()).ToListAsync();
    }

    public async Task<GetSectionDto> GetSectionById(Guid id)
    {
        var dbSection = await _contex.Sections
        .Include(section => section.Blocks)
        .FirstOrDefaultAsync(section => section.Id == id);
        var section = dbSection.Adapt<GetSectionDto>();
        return section;
    }

    public async Task<List<GetSectionDto>> GetSectionByProjectId(Guid projectId)
    {
        return await _contex.Sections
        .Where(s => s.ProjectId == projectId).Include(section => section.Blocks).Select(section =>
        section.Adapt<GetSectionDto>())
        .ToListAsync();
    }

    public async Task UpdateSection(UpdateSectionDto updatedSection)
    {
        var section = updatedSection.Adapt<Section>();
        _contex.Update(section);
        await _contex.SaveChangesAsync();

    }
}