using Microsoft.AspNetCore.Mvc;
using server.Dtos.SectionDtos;
using server.Services.SectionService;

namespace server.Controllers;

[Route("/api/section/")]
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
    [Route("{id}")]
    public async Task<ActionResult<GetSectionDto>> GetById(int id)
    {
        return Ok(await _sectionService.GetSectionById(id));
    }

    [HttpPost]
    [Route("{projectId}")]
    public async Task AddSection([FromBody] AddSectionDto newSection, int projectId)
    {
        await _sectionService.AddSection(newSection, projectId);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task DeleteSection(int id)
    {
        await _sectionService.DeleteSection(id);
    }

    [HttpPut]
    public async Task UpdateSection(UpdateSectionDto updatedSecion)
    {
        await _sectionService.UpdateSection(updatedSecion);
    }
}