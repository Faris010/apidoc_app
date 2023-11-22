using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.SectionDtos;
using server.Response;
using server.Services.SectionService;

namespace server.Controllers;

[Route("/api/section/")]
[ApiController]
//[Authorize]
[EnableCors("AllowSpecificOrigin")]
public class SectionController : ControllerBase
{
    private readonly ISectionService _sectionService;

    public SectionController(ISectionService sectionService)
    {
        _sectionService = sectionService;
    }

    [HttpGet]
    [Route("{id:guid}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(GetSectionDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(EmptyResult), (int)HttpStatusCode.NotFound)]
    public async Task<ActionResult<GetSectionDto>> GetById(Guid id)
    {
        var payload = await _sectionService.GetSectionById(id);
        return payload.Success ? Ok(payload) : BadRequest(payload);
    }

    [HttpGet]
    [Route("projectId/{projectId:guid}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(List<GetSectionDto>), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(EmptyResult), (int)HttpStatusCode.NotFound)]
    public async Task<ActionResult<ApiResponse<List<GetSectionDto>>>> GetByProjectId(Guid projectId)
    {
        return await _sectionService.GetSectionByProjectId(projectId);
    }

    [HttpPost]
    [Route("{projectId:guid}")]
    public async Task AddSection([FromBody] AddSectionDto newSection, Guid projectId)
    {
        await _sectionService.AddSection(newSection, projectId);
    }

    [HttpDelete]
    [Route("{id:guid}")]
    public async Task DeleteSection(Guid id)
    {
        await _sectionService.DeleteSection(id);
    }

    [HttpPut]
    public async Task UpdateSection([FromBody] UpdateSectionDto updatedSecion)
    {
        await _sectionService.UpdateSection(updatedSecion);
    }

    [HttpGet("search/{projectId:guid}/{pageNumber:int}")]
    [ProducesResponseType(typeof(ApiResponse<List<GetSectionDto>>), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<ApiResponse<List<GetSectionDto>>>> SearchSections(string searchTerm, Guid projectId, int pageNumber)
    {
        var response = await _sectionService.SearchSections(searchTerm, projectId, pageNumber);

        return Ok(response);
    }
}