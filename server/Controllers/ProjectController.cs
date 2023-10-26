using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.ProjectDtos;
using server.Services.ProjectService;

namespace server.Controllers
{
    [Route("api/projects/")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GetProjectDto>>> GetAll()
        {
            return Ok(await _projectService.GetAllProjects());
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<GetProjectDto>> GetById(int id)
        {
            return Ok(await _projectService.GetProjectById(id));
        }

        [HttpPost]
        public async Task AddProject(AddProjectDto newProject)
        {
            await _projectService.AddProject(newProject);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task DeleteProject(int id)
        {
            await _projectService.DeleteProject(id);
        }

        [HttpPut]
        public async Task UpdateProject(UpdateProjectDto updatedProject)
        {
            await _projectService.UpdateProject(updatedProject);
        }

    }
}