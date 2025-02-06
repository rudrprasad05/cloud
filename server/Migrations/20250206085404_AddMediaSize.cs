using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddMediaSize : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1856a338-5ff8-4c58-a0a3-83f450069005");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8bf7c826-0eaa-4835-bf65-d2a2dd5baecb");

            migrationBuilder.AddColumn<double>(
                name: "Size",
                table: "Medias",
                type: "double",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "361d2161-b01e-4f5d-9dee-234206601807", null, "User", "USER" },
                    { "5e58ef8f-f15b-4500-8f79-29a9957c1ed1", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "361d2161-b01e-4f5d-9dee-234206601807");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5e58ef8f-f15b-4500-8f79-29a9957c1ed1");

            migrationBuilder.DropColumn(
                name: "Size",
                table: "Medias");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1856a338-5ff8-4c58-a0a3-83f450069005", null, "User", "USER" },
                    { "8bf7c826-0eaa-4835-bf65-d2a2dd5baecb", null, "Admin", "ADMIN" }
                });
        }
    }
}
