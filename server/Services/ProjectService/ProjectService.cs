using Mapster;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.ProjectDtos;
using server.Models;

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
        await _contex.Projects.Where(p => p.Id == id).ExecuteDeleteAsync();
    }

    public async Task<List<GetProjectDto>> GetAllProjects()
    {
        return await _contex.Projects
        .Include(project => project.Sections)
        .Select(project => project.Adapt<GetProjectDto>())
        .ToListAsync();
    }

    public async Task<GetProjectDto> GetProjectById(Guid id)
    {
        var dbProject = await _contex.Projects.Where(proj => proj.Id == id).Include(project => project.Sections).FirstOrDefaultAsync();
        var project = dbProject.Adapt<GetProjectDto>();
        return project;
    }

    public async Task UpdateProject(UpdateProjectDto updatedProject)
    {
        var project = updatedProject.Adapt<Project>();
        project.Slug = GenerateSlug(updatedProject.ProjectName);
        _contex.Update(project);
        await _contex.SaveChangesAsync();
    }
}