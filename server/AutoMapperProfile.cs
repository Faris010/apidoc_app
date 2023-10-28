using AutoMapper;
using server.Dtos.BlockDtos;
using server.Dtos.BlockTypeDtos;
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
        CreateMap<Block, GetBlockDto>();
        CreateMap<AddBlockDto, Block>();
        CreateMap<UpdateBlockDto, Block>();
        CreateMap<BlockType, GetBlockTypeDto>();
        CreateMap<AddBlockTypeDto, BlockType>();
        CreateMap<UpdateBlockTypeDto, BlockType>();
    }
}