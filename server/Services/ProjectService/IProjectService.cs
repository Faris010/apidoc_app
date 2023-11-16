using server.Dtos.ProjectDtos;
using server.Response;

namespace server.Services.ProjectService;

public interface IProjectService
{
    Task<List<GetProjectDto>> GetAllProjects();
    Task<ApiResponse<GetProjectDto>> GetProjectById(Guid id);
    Task AddProject(AddProjectDto newProject);
    Task UpdateProject(UpdateProjectDto updatedProject);
    Task DeleteProject(Guid id);
}