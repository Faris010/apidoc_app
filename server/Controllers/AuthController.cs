using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Dtos;
using server.Models;

namespace server.Controllers;

[Route("api/auth/")]
[ApiController]
public class AuthController : ControllerBase
{

    private readonly DataContext _context;

    private readonly IConfiguration _configuration;

    public AuthController(DataContext contex, IConfiguration configuration)
    {
        _context = contex;
        _configuration = configuration;
    }

    [HttpPost]
    [Route("register")]
    public async Task<ActionResult<User>> Register(UserDto request)
    {

        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

        if (existingUser != null)
        {
            return Conflict("User with this username already exists");
        }
        User user = new User();
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
        user.Username = request.Username;
        user.Password = passwordHash;

        await _context.Users.AddAsync(user);

        try
        {
            await _context.SaveChangesAsync();
            return Ok(user);
        }
        catch (Exception)
        {
            return Conflict("User registration failed");
        }
    }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult<User>> Login(UserDto request)
    {
        var dbUser = await _context.Users.FirstOrDefaultAsync(user => user.Username == request.Username);

        if (dbUser is null)
        {
            return BadRequest("User not found");
        }

        if (!BCrypt.Net.BCrypt.Verify(request.Password, dbUser.Password))
        {
            return BadRequest("Incorrect password");
        }

        string token = CreateToken(dbUser);

        return Ok(token);

    }

    private string CreateToken(User user)
    {
        List<Claim> claims = new List<Claim>{
            new Claim(ClaimTypes.Name, user.Username)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration.GetSection("AppSettings:Token").Value!));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: creds
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;

    }

}