using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
        public async Task<ActionResult<List<GetProjectDto>>> AddProject(AddProjectDto newProject)
        {
            return Ok(await _projectService.AddProject(newProject));
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<List<GetProjectDto>>> DeleteProject(int id)
        {
            var response = await _projectService.DeleteProject(id);
            if (response is null)
            {
                return NotFound(response);
            }

            return Ok(response);
        }

        [HttpPut]
        public async Task<ActionResult<List<GetProjectDto>>> UpdateProject(UpdateProjectDto updatedProject)
        {
            var response = await _projectService.UpdateProject(updatedProject);
            if (response is null)
            {
                return NotFound(response);
            }

            return Ok(response);
        }

    }
}