namespace Health.Api;

public interface IMeasurementService
{
    Task<List<string>> GetAllMeasurements(string userGuid);
    Task<string?> CreateNewMeasurement(CreateMeasurementDto request, Guid userId);
}
