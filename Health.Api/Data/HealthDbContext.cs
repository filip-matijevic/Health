using Health.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Health.Api.Data;

public class HealthDbContext(DbContextOptions<HealthDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
}
