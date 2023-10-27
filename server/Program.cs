using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Services.BlockService;
using server.Services.ProjectService;
using server.Services.SectionService;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<DataContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("WebApiDatabase")));
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});
<<<<<<< HEAD


=======
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
>>>>>>> 9e373a9bd25e8b1d8fe6ee9bb6bb75cb6879095e
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<ISectionService, SectionService>();
builder.Services.AddScoped<IBlockService, BlockService>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>{
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
                ValidateIssuer = false,
                ValidateAudience = false
        };
    });
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigin");

<<<<<<< HEAD
app.UseAuthentication();

=======
>>>>>>> 9e373a9bd25e8b1d8fe6ee9bb6bb75cb6879095e
app.UseAuthorization();

app.MapControllers();

app.Run();
