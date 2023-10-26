using AutoMapper;
using server.Dtos.ProjectDtos;
using server.Dtos.SectionDtos;
using server.Models;

namespace server;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Project, GetProjectDto>();
        CreateMap<AddProjectDto, Project>();
        CreateMap<UpdateProjectDto, Project>();
        CreateMap<AddSectionDto, Section>();
        CreateMap<Section, GetSectionDto>();
        CreateMap<UpdateSectionDto, Section>();
        CreateMap<Section, AddSectionDto>();
    }
}