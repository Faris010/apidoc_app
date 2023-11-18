using Mapster;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.SectionDtos;
using server.Models;
using server.Response;

namespace server.Services.SectionService;

public class SectionService : ISectionService
{

    private readonly DataContext _context;

    public SectionService(DataContext context)
    {
        _context = context;
    }
    public async Task AddSection(AddSectionDto newSection, Guid projectId)
    {
        var section = newSection.Adapt<Section>();
        section.Id = Guid.NewGuid();
        var project = await _context.Projects.Where(p => p.Id == projectId).Include(p => p.Sections).FirstOrDefaultAsync();
        if (project is not null)
        {
            section.ProjectId = projectId;
            await _context.Sections.AddAsync(section);
            project.Sections?.Add(section);
            _context.SaveChanges();
        }
    }

    public async Task DeleteSection(Guid id)
    {
        var section = await _context.Sections.FindAsync(id);

        if (section != null)
        {
            _context.Sections.Remove(section);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<ApiResponse<GetSectionDto>> GetSectionById(Guid id)
    {
        var dbSection = await _context.Sections
            .Include(section => section.Blocks)
            .FirstOrDefaultAsync(section => section.Id == id);

        if (dbSection == null)
        {
            return new ApiResponse<GetSectionDto>()
            {
                Success = false,
                ErrorCode = "Bad Request",
                Payload = null
            };
        }

        var section = dbSection.Adapt<GetSectionDto>();
        return new ApiResponse<GetSectionDto>()
        {
            Success = true,
            Payload = section,
            ErrorCode = null
        };
    }


    public async Task<List<GetSectionDto>> GetSectionByProjectId(Guid projectId)
    {
        return await _context.Sections
        .Where(s => s.ProjectId == projectId).Include(section => section.Blocks).Select(section =>
        section.Adapt<GetSectionDto>())
        .ToListAsync();
    }

    public async Task UpdateSection(UpdateSectionDto updatedSection)
    {
        var section = updatedSection.Adapt<Section>();
        _context.Update(section);
        await _context.SaveChangesAsync();

    }
}