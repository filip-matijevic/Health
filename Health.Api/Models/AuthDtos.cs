namespace Health.Api.Models;

public record RegisterRequestDto(string Username, string Password);
public record LoginRequestDto(string Username, string Password);
public record TokenResponseDto(string AccessToken, string RefreshToken);
public record RefreshRequestDto(Guid UserId, string RefreshToken);
