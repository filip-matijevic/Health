using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Health.Api.Migrations
{
    /// <inheritdoc />
    public partial class UserDetails2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BirthDate",
                table: "UserDetails");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "UserDetails",
                newName: "FirstName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "UserDetails",
                newName: "Name");

            migrationBuilder.AddColumn<DateTime>(
                name: "BirthDate",
                table: "UserDetails",
                type: "timestamp with time zone",
                nullable: true);
        }
    }
}
