using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.SectionDtos;

namespace server.Services.SectionService;

public class SectionService : ISectionService
{

    private readonly DataContext _contex;

    private readonly IMapper _mapper;

    public SectionService(DataContext context, IMapper mapper)
    {
        _contex = context;
        _mapper = mapper;
    }
    public Task<List<GetSectionDto>> AddSection(AddSectionDto newSection)
    {
        throw new NotImplementedException();
    }

    public Task<List<GetSectionDto>> DeleteSection(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<List<GetSectionDto>> GetAllSections()
    {
        var sections = new List<GetSectionDto>();
        var dbSections = new List<GetSectionDto>();
        var dbProjects = await _contex.Sections.ToListAsync();
        sections = dbProjects.Select(section => _mapper.Map<GetSectionDto>(section)).ToList();
        return sections;
    }

    public async Task<GetSectionDto> GetSectionById(int id)
    {
        var dbSection = await _contex.Projects.FirstOrDefaultAsync(section => section.Id == id);
        var section = _mapper.Map<GetSectionDto>(dbSection);
        return section;
    }

    public async Task UpdateSection(UpdateSectionDto updatedSection)
    {
        // var section = await _contex.Sections.FirstOrDefaultAsync(section => section.Id == updatedSection.Id);
        // if (section is null)
        // {
        //     throw new Exception($"Section with Id '{updatedSection.Id}' not found");
        // }
        // section.Name = updatedSection.Name;
        // section.Title = updatedSection.Title;

        // var sections = _mapper.Map<GetSectionDto>(section);

        _contex.Update(updatedSection);
        await _contex.SaveChangesAsync();
        //return sections;

    }
}