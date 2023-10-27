using AutoMapper;
using server.Dtos.BlockDtos;
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
<<<<<<< HEAD
        CreateMap<AddSectionDto, Section>();
        CreateMap<Section, GetSectionDto>();
        CreateMap<UpdateSectionDto, Section>();
        CreateMap<Block, GetBlockDto>();
        CreateMap<AddBlockDto, Block>();
        CreateMap<UpdateBlockDto, Block>();
=======
>>>>>>> 9e373a9bd25e8b1d8fe6ee9bb6bb75cb6879095e
    }
}