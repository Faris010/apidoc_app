using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Dtos;
using server.Models;

namespace server.Controllers;

[Route("api/auth/")]
[ApiController]
[EnableCors("AllowSpecificOrigin")]
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
    public async Task<ActionResult> Register(UserDto request)
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
        _context.SaveChanges();
        return Ok("Registration successful");

    }

    private string CreateRefreshToken()
    {
        byte[] randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult> Login(UserDto request)
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
        string refreshToken = CreateRefreshToken();

        return Ok(new { AccessToken = token, RefreshToken = refreshToken, Username = dbUser.Username });
    }

    [HttpPost]
    [Route("refresh-token")]
    public async Task<ActionResult> RefreshToken([FromBody] string refreshToken, string username)
    {
        var user = await _context.Users.FirstOrDefaultAsync(user => user.Username == username);

        if (user == null)
        {
            return BadRequest("Invalid username");
        }

        string token = CreateToken(user);
        string newRefreshToken = CreateRefreshToken();

        return Ok(new { AccessToken = token, RefreshToken = newRefreshToken });
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
            expires: DateTime.Now.AddMinutes(5),
            // expires: DateTime.Now.AddDays(1),
            signingCredentials: creds
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;

    }

}