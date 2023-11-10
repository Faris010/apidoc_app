using server.Services.BlockService;
using server.Services.BlockTypeSevice;

//using server.Services.BlockTypeService;
using server.Services.ProjectService;
using server.Services.SectionService;

namespace server.Extensions;

public static class ServiceExtension
{
    public static void AddService(this IServiceCollection services)
    {
        services.AddScoped<IProjectService, ProjectService>();
        services.AddScoped<ISectionService, SectionService>();
        services.AddScoped<IBlockService, BlockService>();
        services.AddScoped<IBlockTypeService, BlockTypeService>();
        services.AddControllers().AddNewtonsoftJson(options =>
        {
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        });
    }
}