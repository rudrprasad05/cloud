using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddStarFolder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "02a20c7f-f5f5-404b-abf7-2afe30d35558");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7e78a1cd-c013-498e-b3a4-5c8e1d08b889");

            migrationBuilder.AddColumn<bool>(
                name: "Star",
                table: "Folders",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2cfb5c2a-8574-4cda-abfd-6407508f76b6", null, "Admin", "ADMIN" },
                    { "6a27b5ed-6b55-43cc-b440-58d33db91380", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2cfb5c2a-8574-4cda-abfd-6407508f76b6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6a27b5ed-6b55-43cc-b440-58d33db91380");

            migrationBuilder.DropColumn(
                name: "Star",
                table: "Folders");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "02a20c7f-f5f5-404b-abf7-2afe30d35558", null, "Admin", "ADMIN" },
                    { "7e78a1cd-c013-498e-b3a4-5c8e1d08b889", null, "User", "USER" }
                });
        }
    }
}
