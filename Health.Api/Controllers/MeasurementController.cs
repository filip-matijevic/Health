using Health.Api.Data;
using Health.Api.Entities;
using Health.Api.Models;
using Health.Api.Service.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Health.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MeasurementController(IMeasurementService service) : ControllerBase
{

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateMeasurement(CreateMeasurementDto request)
    {
        var userId = Guid.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
        var response = await service.CreateNewMeasurement(request, userId);

        return Ok("Hello! " + response);
    }

    [HttpGet("Measurements")]
    [Authorize]
    public async Task<ActionResult<List<string>>> GetMeasurements()
    {
        var userId = Guid.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
        var availableMeasurements = await service.GetMeasurements(userId);
        return Ok(availableMeasurements);
    }

    [HttpPost("Measurement/{id:guid}")]
    [Authorize]
    public async Task<IActionResult> AddMeasurementValue(Guid id, PostMeasurementEntryDto request){
        return Ok(await service.AddMeasurementEntry(id, request));
    }

    [HttpGet("Data/{id:guid}")]
    public async Task<List<GetMeasurementEntryDto>> GetMeasurementValues(Guid id){
        return await service.GetMeasurementData(id);
    }


}