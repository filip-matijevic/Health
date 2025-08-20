# --- Base runtime image ---
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
# For Docker services on Render you can expose a fixed port (e.g., 8080)
EXPOSE 8080
ENV ASPNETCORE_URLS=http://0.0.0.0:8080

# --- Build image ---
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy csproj and restore first (better layer caching)
COPY *.csproj ./
RUN dotnet restore

# copy the rest and build
COPY . .
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# --- Final image ---
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Health.Api.dll"]