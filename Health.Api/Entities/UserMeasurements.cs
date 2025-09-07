namespace Health.Api.Entities;

public class UserMeasurements
{
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public ICollection<Measurement> Measurements{ get; set; } = new List<Measurement>();
}

public class Measurement{
    public Guid Id { get; set; }
    public Guid UserId {get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public UserMeasurements? UserMeasurements { get; set; }
    public ICollection<MeasurementEntry> Entries { get; set; } = new List<MeasurementEntry>();
}

public class MeasurementEntry{
    public Guid Id { get; set;}
    public Guid MeasurementId { get; set; }
    public decimal Value { get; set; }
    public DateTime Time { get; set; } = DateTime.UtcNow;
    public Measurement? Measurement { get; set; }
}
