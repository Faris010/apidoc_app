using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.SectionDtos;
using server.Services.SectionService;

namespace server.Controllers;

[Route("/api/section/")]
[ApiController]
[EnableCors("AllowSpecificOrigin")]
public class SectionController : ControllerBase
{
    private readonly ISectionService _sectionService;

    public SectionController(ISectionService sectionService)
    {
        _sectionService = sectionService;
    }

    [HttpGet]
    public async Task<List<GetSectionDto>> GetAll()
    {
        return await _sectionService.GetAllSections();
    }

    [HttpGet]
    [Route("{id:guid}")]
    public async Task<ActionResult<GetSectionDto>> GetById(Guid id)
    {
        return Ok(await _sectionService.GetSectionById(id));
    }

    [HttpGet]
    [Route("projectId/{projectId:guid}")]
    public async Task<ActionResult<GetSectionDto>> GetByProjectId(Guid projectId)
    {
        return Ok(await _sectionService.GetSectionByProjectId(projectId));
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
    public async Task UpdateSection(UpdateSectionDto updatedSecion)
    {
        await _sectionService.UpdateSection(updatedSecion);
    }
}