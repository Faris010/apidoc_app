using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.SectionDtos;
using server.Models;

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
    public async Task AddSection(AddSectionDto newSection)
    {
        var section = _mapper.Map<Section>(newSection);
        await _contex.AddAsync(section);
        await _contex.SaveChangesAsync();
    }

    public async Task DeleteSection(int id)
    {
        await _contex.Sections.Include(section => section.Blocks).Where(section => section.Id == id).ExecuteDeleteAsync();
    }

    public async Task<List<GetSectionDto>> GetAllSections()
    {
        return await _contex.Sections.Include(section => section.Blocks).Select(section =>
        _mapper.Map<GetSectionDto>(section)).ToListAsync();
    }

    public async Task<GetSectionDto> GetSectionById(int id)
    {
        var dbSection = await _contex.Sections
        .Include(section => section.Blocks)
        .FirstOrDefaultAsync(section => section.Id == id);
        var section = _mapper.Map<GetSectionDto>(dbSection);
        return section;
    }

    public async Task UpdateSection(UpdateSectionDto updatedSection)
    {
        var section = _mapper.Map<Section>(updatedSection);
        if (section is null)
        {
            throw new Exception($"Section with Id '{updatedSection.Id}' not found");
        }

        _contex.Update(section);
        await _contex.SaveChangesAsync();

    }
}