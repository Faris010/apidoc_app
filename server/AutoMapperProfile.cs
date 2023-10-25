using AutoMapper;
using server.Dtos.ProjectDtos;
using server.Models;

namespace server;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Project, GetProjectDto>();
        CreateMap<AddProjectDto, Project>();
        CreateMap<UpdateProjectDto, Project>();
    }
}