using System.ComponentModel.DataAnnotations.Schema;

namespace server.Dtos;

public class UserDto
{
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public int Id { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; } 
}