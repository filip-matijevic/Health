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

    public async Task<List<GetMeasurementDto>> GetMeasurements(Guid userId)
    {
        var measurements = await context.Measurements.Where(m=>m.UserId == userId).ToListAsync();
        List<GetMeasurementDto> meaNames = new List<GetMeasurementDto>();

        foreach (Measurement measurement in measurements){
            meaNames.Add(new GetMeasurementDto(measurement.Name, measurement.Description, measurement.Id.ToString()));
        }

        return meaNames;
    }
    public async Task<GetMeasurementEntryDto> AddMeasurementEntry(Guid measurementId, PostMeasurementEntryDto request){
        var measurement = await context.Measurements.FirstOrDefaultAsync(m => m.Id == measurementId);
        if (measurement is null){
            return null;
        }

        Console.WriteLine("Found " + measurement.Name);

        var meaEntry = new MeasurementEntry(){            
            MeasurementId = measurement.Id,
            Value = request.Value
        };

        measurement.Entries.Add(meaEntry);
        await context.SaveChangesAsync();
        return new GetMeasurementEntryDto(meaEntry.Value, meaEntry.Time);
    }

    
    public async Task<List<GetMeasurementEntryDto>> GetMeasurementData(Guid measurementId){
        var measurement = await context.Measurements.Include(m => m.Entries).FirstOrDefaultAsync(m => m.Id == measurementId);
        var entries = new List<GetMeasurementEntryDto>();

        if (measurement is null){
            return entries;
        }

        if (measurement.Entries is null){
            return entries;
        }

        foreach (var entry in measurement.Entries) {
            entries.Add(new GetMeasurementEntryDto(entry.Value, entry.Time));
        }
        return entries;
    }
}
