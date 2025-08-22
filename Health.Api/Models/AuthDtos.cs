namespace Health.Api.Models;

public record RegisterRequestDto(string Username, string Password);
public record LoginRequestDto(string Username, string Password);
public record TokenResponseDto(string AccessTokej, string RefreshToken);
public record RefreshRequestDto(Guid UserId, string RefreshToken);
