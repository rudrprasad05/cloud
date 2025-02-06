using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddNameColInMedia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0e3b2c05-bdfa-4815-8818-51bc9fdd3d88");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "57dfc9a3-0b23-45e3-bca1-65c370a795d3");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Medias",
                type: "longtext",
                nullable: false,
                collation: "utf8mb4_general_ci");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1856a338-5ff8-4c58-a0a3-83f450069005", null, "User", "USER" },
                    { "8bf7c826-0eaa-4835-bf65-d2a2dd5baecb", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1856a338-5ff8-4c58-a0a3-83f450069005");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8bf7c826-0eaa-4835-bf65-d2a2dd5baecb");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Medias");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0e3b2c05-bdfa-4815-8818-51bc9fdd3d88", null, "User", "USER" },
                    { "57dfc9a3-0b23-45e3-bca1-65c370a795d3", null, "Admin", "ADMIN" }
                });
        }
    }
}
