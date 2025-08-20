using Microsoft.AspNetCore.Mvc;

namespace Health.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpGet("GetSomething")]
    public IActionResult GetSomething()
    {
        return Ok("Something");
    }

    [HttpGet("GetSomethingElse")]
    public IActionResult GetSomethingElse()
    {
        return Ok("Something Else");
    }
}
