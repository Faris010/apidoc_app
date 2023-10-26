using server.Dtos.ProjectDtos;

namespace server.Services.ProjectService;

public interface IProjectService
{
    Task<List<GetProjectDto>> GetAllProjects();
    Task<GetProjectDto> GetProjectById(string id);
    Task AddProject(AddProjectDto newProject);
    Task UpdateProject(UpdateProjectDto updatedProject);
    Task DeleteProject(string id);
}