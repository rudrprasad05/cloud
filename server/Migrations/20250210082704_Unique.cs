using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class Unique : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Folders_Name",
                table: "Folders");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "14a39fdb-a59d-4cd1-853e-56ebb34245b8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b45314ce-bb03-4f2f-86d1-848c74c8bf6d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "02a20c7f-f5f5-404b-abf7-2afe30d35558", null, "Admin", "ADMIN" },
                    { "7e78a1cd-c013-498e-b3a4-5c8e1d08b889", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Folders_Name_UserId",
                table: "Folders",
                columns: new[] { "Name", "UserId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Folders_Name_UserId",
                table: "Folders");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "02a20c7f-f5f5-404b-abf7-2afe30d35558");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7e78a1cd-c013-498e-b3a4-5c8e1d08b889");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "14a39fdb-a59d-4cd1-853e-56ebb34245b8", null, "User", "USER" },
                    { "b45314ce-bb03-4f2f-86d1-848c74c8bf6d", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Folders_Name",
                table: "Folders",
                column: "Name",
                unique: true);
        }
    }
}
