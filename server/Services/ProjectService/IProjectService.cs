using server.Dtos.ProjectDtos;
using server.Response;

namespace server.Services.ProjectService;

public interface IProjectService
{
    Task<ApiResponse<List<GetProjectDto>>> GetAllProjects();
    Task<ApiResponse<GetProjectDto>> GetProjectById(Guid id);
    Task AddProject(AddProjectDto newProject);
    Task UpdateProject(UpdateProjectDto updatedProject);
    Task DeleteProject(Guid id);
    Task<ApiResponse<object>> SearchProjects(string searchTerm, int pageNumber);
    Task<ApiResponse<List<GetProjectDto>>> GetAllProjectsPagination(int pageNumber);
}