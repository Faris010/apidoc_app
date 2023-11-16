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
        var project = await _context.Projects.FindAsync(id);

        if (project != null)
        {
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<List<GetProjectDto>> GetAllProjects()
    {
        return await _context.Projects
        .Include(project => project.Sections)
        .Where(project => !project.IsDeleted)
        .Select(project => project.Adapt<GetProjectDto>())
        .ToListAsync();
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
                ErrorCode = "Bad Request",
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

}