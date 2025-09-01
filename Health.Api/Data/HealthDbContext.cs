using Health.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Health.Api.Data;

public class HealthDbContext(DbContextOptions<HealthDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<UserDetails> UserDetails { get; set; }
    public DbSet<UserMeasurements> UserMeasurements { get; set; }
    public DbSet<Measurement> Measurements { get; set; }
    public DbSet<MeasurementEntry> MeasurementEntries { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(u =>
        {
            u.HasKey(x => x.Id);

            u.HasOne(x => x.UserDetails)
             .WithOne(d => d.User)
             .HasForeignKey<UserDetails>(d => d.UserId);

            u.HasOne(x => x.UserMeasurements)
            .WithOne(m => m.User)
            .HasForeignKey<UserMeasurements>(f => f.UserId);
        });

        modelBuilder.Entity<UserDetails>(d =>
        {
            d.HasKey(x => x.UserId);  // PK == FK
        });

        modelBuilder.Entity<UserMeasurements>(m =>
        {
            m.HasKey(x => x.UserId);
        });

        modelBuilder.Entity<Measurement>(e =>
            {
                e.HasKey(x => x.Id);

                e.HasOne(m => m.UserMeasurements)
                 .WithMany(um => um.Measurements)
                 .HasForeignKey(m => m.UserId)
                 .HasPrincipalKey(um => um.UserId);
            });

        modelBuilder.Entity<MeasurementEntry>(e =>
        {
            e.HasKey(x => x.Id);

            e.HasOne(x => x.Measurement)
             .WithMany(m => m.Entries)
             .HasForeignKey(x => x.MeasurementId);
        });
    }
}
