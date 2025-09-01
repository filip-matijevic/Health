using System.Security.Claims;
using Health.Api.Data;
using Health.Api.Entities;
using Health.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Health.Api;

[ApiController]
[Route("api/[controller]")]
public class UserDetailsController(HealthDbContext context) : ControllerBase
{

    [HttpPost("setUserDetails/{id:guid}")]
    public async Task<IActionResult> SetUserResults(Guid id, UserDetailPostRequestDto request)
    {
        //find the user
        User? user = await context.Users.Include(u => u.UserDetails).FirstOrDefaultAsync(x => x.Id == id);
        if (user is null)
        {
            return BadRequest("User does not exist");
        }

        if (user.UserDetails is null)
        {
            UserDetails details = new UserDetails()
            {
                User = user,
                FirstName = request.FirstName,
                LastNamme = request.LastName,
                BirthDate = request.BirthDate,
                Gender = request.Gender
            };
            user.UserDetails = details;
        }
        else
        {
            user.UserDetails.FirstName = request.FirstName;
            user.UserDetails.LastNamme = request.LastName;
            user.UserDetails.BirthDate = request.BirthDate;
            user.UserDetails.Gender = request.Gender;
        }
        await context.SaveChangesAsync();
        return Ok(user.UserDetails.FirstName);
    }

    [HttpGet("getUserDetails")]
    [Authorize]
    public async Task<ActionResult<UserDetailGetResponseDto>> GetUserDetails()
    {

        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdClaim, out var userId))
            return Unauthorized("Invalid user id in token.");

        var details = await context.UserDetails
            .AsNoTracking()
            .FirstOrDefaultAsync(d => d.UserId == userId);

        if (details is null)
            return NotFound(); // user exists (auth), but no details stored yet
        return Ok(new UserDetailGetResponseDto(details.FirstName, details.LastNamme, details.Gender, details.BirthDate));
    }
}
