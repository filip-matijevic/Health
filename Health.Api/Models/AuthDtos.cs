namespace Health.Api.Models;

public record RegisterRequestDto(string Username, string Password);
public record LoginRequestDto(string Username, string Password);
