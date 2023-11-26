using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.ProjectDtos;
using server.Response;
using server.Services.ProjectService;

namespace server.Controllers
{
    [Route("api/projects/")]
    [ApiController]
    [Authorize]
    [EnableCors("AllowSpecificOrigin")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<GetProjectDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(EmptyResult), (int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<ApiResponse<List<GetProjectDto>>>> GetAll()
        {
            return await _projectService.GetAllProjects();
        }

        [HttpGet("{pageNumber}")]
        [ProducesResponseType(typeof(ApiResponse<List<GetProjectDto>>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(EmptyResult), (int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<ApiResponse<List<GetProjectDto>>>> GetAll(int pageNumber = 1)
        {
            return await _projectService.GetAllProjectsPagination(pageNumber);
        }


        [HttpGet]
        [Route("{id:guid}")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ApiResponse<GetProjectDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(EmptyResult), (int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<GetProjectDto>> GetById(Guid id)
        {
            var payload = await _projectService.GetProjectById(id);
            return payload.Success ? Ok(payload) : BadRequest(payload);
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

        [HttpGet("search/{pageNumber:int}")]
        [ProducesResponseType(typeof(ApiResponse<object>), (int)HttpStatusCode.OK)] // Adjust the type to ApiResponse<object>
        [ProducesResponseType(typeof(EmptyResult), (int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<ApiResponse<object>>> SearchProjects([FromQuery] string searchTerm, int pageNumber)
        {
            return await _projectService.SearchProjects(searchTerm, pageNumber);
        }

    }
}