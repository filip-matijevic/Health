using Health.Api.Data;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using Health.Api.Service.Auth;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

string dbPath = Environment.GetEnvironmentVariable("CONNECTIONSTRINGS__POSTGRES");
Console.WriteLine(dbPath);
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<HealthDbContext>(
    options => 
    options.UseNpgsql(dbPath)
);
builder.Services.AddScoped<IAuthService, AuthService>();


var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.MapControllers();
app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
