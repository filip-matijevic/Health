using Health.Api.Data;
using Health.Api.Entities;
using Health.Api.Models;
using Health.Api.Service.Auth;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Health.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<User>> Register([FromBody] RegisterRequestDto request)
    {
        User? user = await authService.RegisterAsync(request);
        if (user is null){
            return BadRequest("Username already exists");
        }
        return Ok(user);
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login(LoginRequestDto request)
    {
        var result = await authService.LoginAsync(request);
        if (result is null){
            return BadRequest("Username or Password incorrect");
        }
        return Ok(result);
    }

    [HttpPost("refreshToken")]
    public async Task<ActionResult<TokenResponseDto>> RefreshToken(RefreshRequestDto request){
        var token = await authService.RefreshTokenAsync(request);
        return Ok();
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers()
    {
        return Ok(await authService.GetUserCount());
    }
}