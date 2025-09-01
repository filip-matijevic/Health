using Health.Api.Data;
using Health.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Health.Api;

public class MeasurementService(HealthDbContext context) : IMeasurementService
{
    public async Task<string?> CreateNewMeasurement(CreateMeasurementDto request, Guid userId)
    {
        User? user = await context.Users
        .Include(u => u.UserMeasurements)
        .ThenInclude(um => um.Measurements)
        .FirstOrDefaultAsync(u => u.Id == userId);
        if (user is null)
        {
            return "user does not exist";
        }

        if (user!.UserMeasurements is null)
        {
            user.UserMeasurements = new UserMeasurements()
            {
                UserId = user.Id,
                Measurements = new List<Measurement>()
            };
        }

        Console.WriteLine("User has " + user.UserMeasurements.Measurements.Count + " custom measurements");

        Measurement measurement = new Measurement()
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            Name = request.Name,
            Description = "dsc random"
        };

        context.Measurements.Add(measurement);
        try
        {
            await context.SaveChangesAsync(); // persists UM (if new) + Measurement
            return measurement.Name;
        }
        catch (DbUpdateException ex)
        {
            // If you have a unique index on (UserId, Name), handle race-condition duplicates here.
            // Inspect ex.InnerException if you want to differentiate errors by code.
            return $"Failed to create measurement: {ex.Message}";
        }
    }

    public Task<List<string>> GetAllMeasurements(string userGuid)
    {
        throw new NotImplementedException();
    }
}
