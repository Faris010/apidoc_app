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
        var sectionsToDelete = await _context.Sections
            .Include(s => s.Blocks)
            .Where(s => s.Id == id || s.ParentId == id)
            .ToListAsync();

        if (sectionsToDelete == null || !sectionsToDelete.Any())
        {
            return;
        }

        async Task RecursiveDelete(Guid parentId)
        {
            var sections = await _context.Sections
                .Include(s => s.Blocks)
                .Where(s => s.ParentId == parentId)
                .ToListAsync();

            if (sections == null || !sections.Any())
            {
                return;
            }

            foreach (var section in sections)
            {
                await RecursiveDelete(section.Id);

                _context.Blocks.RemoveRange(section.Blocks);
                _context.Sections.Remove(section);
            }
        }

        foreach (var section in sectionsToDelete)
        {
            await RecursiveDelete(section.Id);

            _context.Blocks.RemoveRange(section.Blocks);
            _context.Sections.Remove(section);
        }

        await _context.SaveChangesAsync();
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
                ErrorCode = "Not Found",
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


    public async Task<ApiResponse<List<GetSectionDto>>> GetSectionByProjectId(Guid projectId)
    {
        var sections = await _context.Sections
            .Where(s => s.ProjectId == projectId)
            .Include(section => section.Blocks)
            .ToListAsync();

        if (sections == null || !sections.Any())
        {
            return new ApiResponse<List<GetSectionDto>>()
            {
                Success = false,
                ErrorCode = "Not Found",
                Payload = null
            };
        }

        var sectionDtos = sections
            .Select(section => section.Adapt<GetSectionDto>())
            .ToList();

        return new ApiResponse<List<GetSectionDto>>()
        {
            Success = true,
            Payload = sectionDtos,
            ErrorCode = null
        };
    }

    public async Task UpdateSection(UpdateSectionDto updatedSection)
    {
        var section = updatedSection.Adapt<Section>();
        _context.Update(section);
        await _context.SaveChangesAsync();

    }

    public async Task<ApiResponse<object>> SearchSections(string searchTerm, Guid projectId, int pageNumber)
    {
        const int pageSize = 5;

        var sectionIds = await _context.Sections
            .Where(s => s.ProjectId == projectId)
            .Select(s => s.Id)
            .ToListAsync();

        var matchingSections = await _context.Sections
            .Where(s => s.Title.ToLower().Contains(searchTerm.ToLower()) || s.Blocks.Any(b => b.Content.ToLower().Contains(searchTerm.ToLower())))
            .Where(s => sectionIds.Contains(s.Id))
            .Include(s => s.Blocks)
            .Select(s => s.Adapt<GetSectionDto>())
            .ToListAsync();

        var totalItems = matchingSections.Count;

        var paginatedSections = matchingSections
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        var response = new
        {
            paginatedSections,
            TotalItems = totalItems
        };

        return new ApiResponse<object>()
        {
            Success = true,
            Payload = response,
            ErrorCode = null
        };
    }
}