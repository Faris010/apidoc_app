using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
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

    public async Task<List<GetProjectDto>> AddProject(AddProjectDto newProject)
    {
        var project = new List<GetProjectDto>();
        newProject.Slug = GenerateSlug(newProject.ProjectName);
        await _contex.AddAsync(_mapper.Map<Project>(newProject));
        await _contex.SaveChangesAsync();
        project = await _contex.Projects.Select(proj => _mapper.Map<GetProjectDto>(proj)).ToListAsync();
        return project;
    }

    public async Task<List<GetProjectDto>> DeleteProject(int id)
    {
        var projects = new List<GetProjectDto>();
        var findProject = _contex.Projects.FirstOrDefault(proj => proj.Id == id);
        if (findProject is null)
        {
            throw new Exception($"Project with Id '{id}' not found");
        }
        _contex.Projects.Remove(findProject);
        await _contex.SaveChangesAsync();

        projects = await _contex.Projects.Select(proj => _mapper.Map<GetProjectDto>(proj)).ToListAsync();

        return projects;
    }

    public async Task<List<GetProjectDto>> GetAllProjects()
    {
        var projects = new List<GetProjectDto>();
        var dbProjects = await _contex.Projects.ToListAsync();
        projects = dbProjects.Select(proj => _mapper.Map<GetProjectDto>(proj)).ToList();
        return projects;
    }

    public async Task<GetProjectDto> GetProjectById(int id)
    {
        var dbProject = await _contex.Projects.FirstOrDefaultAsync(proj => proj.Id == id);
        var project = _mapper.Map<GetProjectDto>(dbProject);
        return project;
    }

    public async Task<GetProjectDto> UpdateProject(UpdateProjectDto updatedProject)
    {
        var project = await _contex.Projects.FirstOrDefaultAsync(proj => proj.Id == updatedProject.Id);
        if (project is null)
        {
            throw new Exception($"Project with Id '{updatedProject.Id}' not found");
        }
        project.ProjectName = updatedProject.ProjectName;
        project.Slug = GenerateSlug(updatedProject.ProjectName);
        project.Logo = updatedProject.Logo;

        var projects = _mapper.Map<GetProjectDto>(project);

        return projects;
    }
}