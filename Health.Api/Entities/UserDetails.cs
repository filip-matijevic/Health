using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Health.Api.Entities;

public class UserDetails
{
    public Guid UserId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastNamme { get; set; } = string.Empty;
    public DateTime BirthDate;
    public string Gender { get; set; } = string.Empty;
    public required User User  { get; set; }
}
