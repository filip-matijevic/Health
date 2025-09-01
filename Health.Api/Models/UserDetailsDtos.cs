namespace Health.Api.Models;


public record UserDetailPostRequestDto(string FirstName, string LastName, string Gender, DateTime BirthDate);
public record UserDetailGetResponseDto(string FirstName, string LastName, string Gender, DateTime BirthDate);
