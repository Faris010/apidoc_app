using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.ProjectDtos;
using server.Services.ProjectService;

namespace server.Controllers
{
    [Route("api/projects/")]
    [ApiController]
    [EnableCors("AllowSpecificOrigin")]
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
        [Route("{id:guid}")]
        public async Task<ActionResult<GetProjectDto>> GetById(Guid id)
        {
            return Ok(await _projectService.GetProjectById(id));
        }

        [HttpPost]
        public async Task AddProject(AddProjectDto newProject)
        {
            await _projectService.AddProject(newProject);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task DeleteProject(Guid id)
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