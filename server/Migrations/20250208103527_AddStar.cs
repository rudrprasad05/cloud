using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddStar : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "361d2161-b01e-4f5d-9dee-234206601807");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5e58ef8f-f15b-4500-8f79-29a9957c1ed1");

            migrationBuilder.AddColumn<bool>(
                name: "Star",
                table: "Medias",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "14a39fdb-a59d-4cd1-853e-56ebb34245b8", null, "User", "USER" },
                    { "b45314ce-bb03-4f2f-86d1-848c74c8bf6d", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "14a39fdb-a59d-4cd1-853e-56ebb34245b8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b45314ce-bb03-4f2f-86d1-848c74c8bf6d");

            migrationBuilder.DropColumn(
                name: "Star",
                table: "Medias");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "361d2161-b01e-4f5d-9dee-234206601807", null, "User", "USER" },
                    { "5e58ef8f-f15b-4500-8f79-29a9957c1ed1", null, "Admin", "ADMIN" }
                });
        }
    }
}
