using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Health.Api.Data;
using Health.Api.Entities;
using Health.Api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Health.Api.Service.Auth;

public class AuthService(HealthDbContext context) : IAuthService
{
    public async Task<string?> LoginAsync(LoginRequestDto request)
    {
        User? user = await context.Users.FirstOrDefaultAsync(x => x.Username == request.Username);
        if (user is null)
        {
            return null;
        }

        if (new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
        {
            return null;
        }

        return CreateToken(user);
    }

    public async Task<User?> RegisterAsync(RegisterRequestDto request)
    {
        if (await context.Users.FirstOrDefaultAsync(x => x.Username == request.Username) is not null)
        {
            return null;
        }

        User user = new User();
        var hashedPassword = new PasswordHasher<User>().HashPassword(user, request.Password);
        user.Username = request.Username;
        user.PasswordHash = hashedPassword;

        await context.Users.AddAsync(user);
        await context.SaveChangesAsync();
        return user;
    }

    public async Task<int> GetUserCount()
    {
        return await context.Users.CountAsync();
    }

    private string CreateToken(User user){

        var claims = new List<Claim>{
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("TOKEN")!));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

        var tokenDescriptor = new JwtSecurityToken(
            issuer:Environment.GetEnvironmentVariable("ISSUER")!,
            audience:Environment.GetEnvironmentVariable("AUDIENCE")!,
            claims: claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: creds
            );
        return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
    }
}
