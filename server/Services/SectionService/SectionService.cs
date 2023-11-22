using Mapster;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.BlockDtos;
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
        var section = await _context.Sections
            .Include(s => s.Blocks)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (section != null)
        {
            _context.Blocks.RemoveRange(section.Blocks);
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

    public async Task<ApiResponse<List<GetSectionDto>>> SearchSections(string searchTerm, Guid projectId, int pageNumber)
    {
        const int pageSize = 5;

        var sectionsQuery = _context.Sections
            .Include(s => s.Blocks)
            .Where(s => s.ProjectId == projectId && EF.Functions.ILike(s.Title, $"%{searchTerm}%"));

        var totalItemsSections = await sectionsQuery.CountAsync();

        var paginatedSections = await sectionsQuery
            .OrderBy(s => s.Title)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(s => new GetSectionDto
            {
                Id = s.Id,
                Title = s.Title,
                ProjectId = s.ProjectId,
                Blocks = s.Blocks
                    .Where(b => EF.Functions.ILike(b.Content, $"%{searchTerm}%"))
                    .OrderBy(b => b.SortOrder)
                    .Select(b => new Block
                    {
                        Id = b.Id,
                        Content = b.Content,
                        Image = b.Image,
                        SortOrder = b.SortOrder,
                        SectionId = b.SectionId,
                        BlockTypeId = b.BlockTypeId // Ensure BlockTypeId is assigned
                                                    // Add other necessary properties
                    })
                    .ToList()
            })
            .ToListAsync();

        return new ApiResponse<List<GetSectionDto>>()
        {
            Success = true,
            Payload = paginatedSections,
            ErrorCode = null
        };
    }



    public async Task UpdateSection(UpdateSectionDto updatedSection)
    {
        var section = updatedSection.Adapt<Section>();
        _context.Update(section);
        await _context.SaveChangesAsync();

    }
}