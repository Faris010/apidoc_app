using server.Dtos.ProjectDtos;

namespace server.Services.ProjectService;

public interface IProjectService
{
    Task<List<GetProjectDto>> GetAllProjects();
    Task<GetProjectDto> GetProjectById(int id);
    Task<List<GetProjectDto>> AddProject(AddProjectDto newProject);
    Task<GetProjectDto> UpdateProject(UpdateProjectDto updatedProject);
    Task<List<GetProjectDto>> DeleteProject(int id);
}