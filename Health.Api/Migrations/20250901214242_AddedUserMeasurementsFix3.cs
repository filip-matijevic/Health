using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Health.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddedUserMeasurementsFix3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Measurement_UserMeasurements_UserId",
                table: "Measurement");

            migrationBuilder.DropForeignKey(
                name: "FK_MeasurementEntry_Measurement_MeasurementId",
                table: "MeasurementEntry");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MeasurementEntry",
                table: "MeasurementEntry");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Measurement",
                table: "Measurement");

            migrationBuilder.RenameTable(
                name: "MeasurementEntry",
                newName: "MeasurementEntries");

            migrationBuilder.RenameTable(
                name: "Measurement",
                newName: "Measurements");

            migrationBuilder.RenameIndex(
                name: "IX_MeasurementEntry_MeasurementId",
                table: "MeasurementEntries",
                newName: "IX_MeasurementEntries_MeasurementId");

            migrationBuilder.RenameIndex(
                name: "IX_Measurement_UserId",
                table: "Measurements",
                newName: "IX_Measurements_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MeasurementEntries",
                table: "MeasurementEntries",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Measurements",
                table: "Measurements",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MeasurementEntries_Measurements_MeasurementId",
                table: "MeasurementEntries",
                column: "MeasurementId",
                principalTable: "Measurements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Measurements_UserMeasurements_UserId",
                table: "Measurements",
                column: "UserId",
                principalTable: "UserMeasurements",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MeasurementEntries_Measurements_MeasurementId",
                table: "MeasurementEntries");

            migrationBuilder.DropForeignKey(
                name: "FK_Measurements_UserMeasurements_UserId",
                table: "Measurements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Measurements",
                table: "Measurements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MeasurementEntries",
                table: "MeasurementEntries");

            migrationBuilder.RenameTable(
                name: "Measurements",
                newName: "Measurement");

            migrationBuilder.RenameTable(
                name: "MeasurementEntries",
                newName: "MeasurementEntry");

            migrationBuilder.RenameIndex(
                name: "IX_Measurements_UserId",
                table: "Measurement",
                newName: "IX_Measurement_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_MeasurementEntries_MeasurementId",
                table: "MeasurementEntry",
                newName: "IX_MeasurementEntry_MeasurementId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Measurement",
                table: "Measurement",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MeasurementEntry",
                table: "MeasurementEntry",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Measurement_UserMeasurements_UserId",
                table: "Measurement",
                column: "UserId",
                principalTable: "UserMeasurements",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MeasurementEntry_Measurement_MeasurementId",
                table: "MeasurementEntry",
                column: "MeasurementId",
                principalTable: "Measurement",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
