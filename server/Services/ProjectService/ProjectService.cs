using Mapster;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.ProjectDtos;
using server.Models;
using server.Response;


namespace server.Services.ProjectService;

public class ProjectService : IProjectService
{
    private readonly DataContext _context;

    public ProjectService(DataContext context)
    {
        _context = context;
    }

    private static string GenerateSlug(string projectName)
    {
        return projectName.ToLower().Replace(" ", "-");
    }

    public async Task AddProject(AddProjectDto newProject)
    {
        newProject.Slug = GenerateSlug(newProject.ProjectName);
        var project = newProject.Adapt<Project>();
        project.Id = Guid.NewGuid();
        await _context.AddAsync(project);
        _context.SaveChanges();
    }

    public async Task DeleteProject(Guid id)
    {
        var project = await _context.Projects
            .Include(p => p.Sections)
            .ThenInclude(s => s.Blocks)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project != null)
        {
            if (project.Sections != null)
            {
                foreach (var section in project.Sections)
                {
                    if (section.Blocks != null)
                    {
                        _context.Blocks.RemoveRange(section.Blocks);
                    }
                }
                _context.Sections.RemoveRange(project.Sections);
            }

            _context.Projects.Remove(project);

            await _context.SaveChangesAsync();
        }
    }


    public async Task<ApiResponse<List<GetProjectDto>>> GetAllProjects()
    {
        var projects = await _context.Projects
            .Include(project => project.Sections)
            .ToListAsync();

        var projectDtos = projects
            .Select(project => project.Adapt<GetProjectDto>())
            .ToList();

        return new ApiResponse<List<GetProjectDto>>()
        {
            Success = true,
            Payload = projectDtos,
            ErrorCode = null
        };
    }

    public async Task<ApiResponse<List<GetProjectDto>>> GetAllProjectsPagination(int pageNumber)
    {
        const int pageSize = 8;

        var totalProjects = await _context.Projects.CountAsync();

        var projects = await _context.Projects
            .Include(project => project.Sections)
            .OrderBy(project => project.Id)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var projectDtos = projects
            .Select(project => project.Adapt<GetProjectDto>())
            .ToList();

        var response = new ApiResponse<List<GetProjectDto>>()
        {
            Success = true,
            Payload = projectDtos,
            ErrorCode = null,
        };

        return response;
    }



    public async Task<ApiResponse<GetProjectDto>> GetProjectById(Guid id)
    {
        var dbProject = await _context.Projects
        .Where(proj => proj.Id == id)
        .Include(project => project.Sections)
        .FirstOrDefaultAsync();

        if (dbProject == null)
        {
            return new ApiResponse<GetProjectDto>()
            {
                Success = false,
                ErrorCode = "Not Found",
                Payload = null
            };
        }

        var project = dbProject.Adapt<GetProjectDto>();
        return new ApiResponse<GetProjectDto>()
        {
            Success = true,
            Payload = project,
            ErrorCode = null
        };
    }

    public async Task UpdateProject(UpdateProjectDto updatedProject)
    {
        var project = updatedProject.Adapt<Project>();
        project.Slug = GenerateSlug(updatedProject.ProjectName);
        _context.Update(project);
        await _context.SaveChangesAsync();
    }

    public async Task<ApiResponse<List<GetProjectDto>>> SearchProjects(string searchTerm, int pageNumber)
    {
        const int pageSize = 8;

        var filteredProjectsQuery = _context.Projects
            .Where(p => p.ProjectName.Contains(searchTerm))
            .OrderBy(p => p.ProjectName)
            .Select(p => p.Adapt<GetProjectDto>());

        var totalItems = await filteredProjectsQuery.CountAsync();

        var paginatedProjects = await filteredProjectsQuery
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new ApiResponse<List<GetProjectDto>>()
        {
            Success = true,
            Payload = paginatedProjects,
            ErrorCode = null
        };
    }
}

internal class PaginationMeta
{
    public int TotalItems { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
}