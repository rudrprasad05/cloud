using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "43a2e83e-3aa8-49ad-8f29-0e18a9d0503b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8d1fa40f-4e80-45b3-9b64-0e5f7d4ef8db");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "971e516e-ffe3-48ff-9d87-abd4af6248a6", null, "Admin", "ADMIN" },
                    { "c4160050-1146-4787-b197-e83b95faabe8", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "971e516e-ffe3-48ff-9d87-abd4af6248a6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c4160050-1146-4787-b197-e83b95faabe8");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "43a2e83e-3aa8-49ad-8f29-0e18a9d0503b", null, "User", "USER" },
                    { "8d1fa40f-4e80-45b3-9b64-0e5f7d4ef8db", null, "Admin", "ADMIN" }
                });
        }
    }
}
