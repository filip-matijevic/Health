using Microsoft.AspNetCore.Mvc;

namespace Health.Api;

public interface IMeasurementService
{
    Task<string?> CreateNewMeasurement(CreateMeasurementDto request, Guid userId);
    Task<List<GetMeasurementDto>> GetMeasurements(Guid userId);
    Task<GetMeasurementEntryDto> AddMeasurementEntry(Guid measurementId, PostMeasurementEntryDto request);
    Task<List<GetMeasurementEntryDto>> GetMeasurementData(Guid measurementId);
}
