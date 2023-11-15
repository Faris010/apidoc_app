using Mapster;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.ProjectDtos;
using server.Models;
using server.Response;

namespace server.Services.ProjectService;

public class ProjectService : IProjectService
{
    private readonly DataContext _contex;

    public ProjectService(DataContext context)
    {
        _contex = context;
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
        await _contex.AddAsync(project);
        await _contex.SaveChangesAsync();
    }

    public async Task DeleteProject(Guid id)
    {
        var project = await _contex.Projects.FindAsync(id);

        if (project != null)
        {
            _contex.Projects.Attach(project);
            project.IsDeleted = true;
            await _contex.SaveChangesAsync();
        }
    }

    public async Task<List<GetProjectDto>> GetAllProjects()
    {
        return await _contex.Projects
        .Include(project => project.Sections)
        .Where(project => !project.IsDeleted)
        .Select(project => project.Adapt<GetProjectDto>())
        .ToListAsync();
    }

    public async Task<ApiResponse<GetProjectDto>> GetProjectById(Guid id)
    {
        var dbProject = await _contex.Projects
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
        _contex.Update(project);
        await _contex.SaveChangesAsync();
    }

    public async Task RestoreProject(Guid id)
    {
        var project = await _contex.Projects.FindAsync(id);

        if (project != null)
        {
            project.IsDeleted = false;
            await _contex.SaveChangesAsync();
        }
    }

}