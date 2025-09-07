namespace Health.Api;

public record CreateMeasurementDto(string Name);
public record GetMeasurementDto(string Name, string Description, string id);
public record PostMeasurementEntryDto(decimal Value);
public record GetMeasurementEntryDto(decimal Value, DateTime Time);
