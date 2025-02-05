using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class addFk : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1b1761d5-4212-4b20-8057-d93a1f7f7b06");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "40a20693-a072-4279-93c5-17c6bd87c5dd");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0e3b2c05-bdfa-4815-8818-51bc9fdd3d88", null, "User", "USER" },
                    { "57dfc9a3-0b23-45e3-bca1-65c370a795d3", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0e3b2c05-bdfa-4815-8818-51bc9fdd3d88");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "57dfc9a3-0b23-45e3-bca1-65c370a795d3");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1b1761d5-4212-4b20-8057-d93a1f7f7b06", null, "User", "USER" },
                    { "40a20693-a072-4279-93c5-17c6bd87c5dd", null, "Admin", "ADMIN" }
                });
        }
    }
}
