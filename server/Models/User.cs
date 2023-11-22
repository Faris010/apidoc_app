using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class User : BaseEntity
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string? RefreshToken { get; set; }
}