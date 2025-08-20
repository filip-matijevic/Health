using Health.Api.Data;
using Health.Api.Entities;
using Health.Api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Health.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(HealthDbContext context) : ControllerBase
{
    [HttpPost("register")]
    public ActionResult<User> Register([FromBody] RegisterRequestDto request)
    {
        return Ok(request);
    }

    [HttpGet("login")]
    public IActionResult Login()
    {
        return Ok("Something Else");
    }

    [HttpGet("users")]
    public IActionResult GetAllUsers()
    {
        return Ok(context.Users.ToList());
    }
}