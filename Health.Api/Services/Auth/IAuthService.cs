using Health.Api.Entities;
using Health.Api.Models;

namespace Health.Api.Service.Auth;

public interface IAuthService
{
    Task<User?> RegisterAsync(RegisterRequestDto request);
    Task<string?> LoginAsync(LoginRequestDto request);
    Task<int> GetUserCount();
}
