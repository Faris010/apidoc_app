<<<<<<< HEAD
using Microsoft.AspNetCore.Authorization;
=======
>>>>>>> 9e373a9bd25e8b1d8fe6ee9bb6bb75cb6879095e
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
        public async Task<ActionResult<GetProjectDto>> GetById(string id)
        {
            return Ok(await _projectService.GetProjectById(id));
        }

        [HttpPost]
<<<<<<< HEAD
        public async Task AddProject(AddProjectDto newProject)
        {
            await _projectService.AddProject(newProject);
=======
        public async Task<ActionResult> AddProject(AddProjectDto newProject)
        {
            await _projectService.AddProject(newProject);
            return NoContent();
>>>>>>> 9e373a9bd25e8b1d8fe6ee9bb6bb75cb6879095e
        }

        [HttpDelete]
        [Route("{id}")]
<<<<<<< HEAD
        public async Task DeleteProject(int id)
        {
            await _projectService.DeleteProject(id);
        }

        [HttpPut]
        public async Task UpdateProject(UpdateProjectDto updatedProject)
        {
            await _projectService.UpdateProject(updatedProject);
=======
        public async Task<ActionResult> DeleteProject(string id)
        {
            await _projectService.DeleteProject(id);
            return NoContent();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateProject(UpdateProjectDto updatedProject)
        {
            await _projectService.UpdateProject(updatedProject);
            return NoContent();
>>>>>>> 9e373a9bd25e8b1d8fe6ee9bb6bb75cb6879095e
        }

    }
}