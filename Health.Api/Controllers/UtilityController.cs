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
public class UtilityController() : ControllerBase
{

    [HttpGet("ping")]
    public async Task<IActionResult> SayPong()
    {
        return Ok("pong");
    }
}