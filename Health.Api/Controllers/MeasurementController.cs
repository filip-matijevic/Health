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
public class MeasurementController(IMeasurementService service) : ControllerBase
{

    [HttpGet("ping/{id:guid}")]
    public async Task<IActionResult> SayPong([FromRoute]Guid id)
    {
        Console.WriteLine("Hello! " + id);
        return Ok("Hello! " + id);
    }

    [HttpPost("createMeasurement/{id:guid}")]
    public async Task<IActionResult> CreateMeasurement([FromRoute]Guid id, CreateMeasurementDto request){
        var response = await service.CreateNewMeasurement(request, id);
        
        return Ok("Hello! " + response);
    }
}