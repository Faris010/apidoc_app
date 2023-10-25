using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.ProjectDtos;
using server.Models;

namespace server.Services.ProjectService;

public class ProjectService : IProjectService
{
    private readonly DataContext _contex;

    private readonly IMapper _mapper;

    public ProjectService(DataContext context, IMapper mapper)
    {
        _contex = context;
        _mapper = mapper;
    }

    private static string GenerateSlug(string projectName)
    {
        return projectName.ToLower().Replace(" ", "-");
    }

    public async Task AddProject(AddProjectDto newProject)
    {
        newProject.Slug = GenerateSlug(newProject.ProjectName);
        var project = _mapper.Map<Project>(newProject);
        await _contex.AddAsync(project);
        await _contex.SaveChangesAsync();
    }

    public async Task DeleteProject(int id)
    {
        await _contex.Projects.Where(p => p.Id == id).ExecuteDeleteAsync();
    }

    public async Task<List<GetProjectDto>> GetAllProjects()
    {
        return await _contex.Projects.Select(project =>
        _mapper.Map<GetProjectDto>(project)).ToListAsync();
    }

    public async Task<GetProjectDto> GetProjectById(int id)
    {
        var dbProject = await _contex.Projects.FirstOrDefaultAsync(proj => proj.Id == id);
        var project = _mapper.Map<GetProjectDto>(dbProject);
        return project;
    }

    public async Task UpdateProject(UpdateProjectDto updatedProject)
    {
        var project = _mapper.Map<Project>(updatedProject);
        if (project is null)
        {
            throw new Exception($"Project with Id '{updatedProject.Id}' not found");
        }

        _contex.Update(project);
        await _contex.SaveChangesAsync();
    }
}