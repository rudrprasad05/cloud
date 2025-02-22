using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class ShareNotNull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8ef7890f-89b8-49b7-8991-d4628446b124");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f89daeda-da42-4ecc-914f-399088371cf8");

            migrationBuilder.UpdateData(
                table: "Medias",
                keyColumn: "ShareId",
                keyValue: null,
                column: "ShareId",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "ShareId",
                table: "Medias",
                type: "longtext",
                nullable: false,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "106d2836-34ad-4c7e-9466-76c827178049", null, "Admin", "ADMIN" },
                    { "94240fdc-1481-4ffd-aa0a-5b60f4a56fc4", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "106d2836-34ad-4c7e-9466-76c827178049");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "94240fdc-1481-4ffd-aa0a-5b60f4a56fc4");

            migrationBuilder.AlterColumn<string>(
                name: "ShareId",
                table: "Medias",
                type: "longtext",
                nullable: true,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8ef7890f-89b8-49b7-8991-d4628446b124", null, "Admin", "ADMIN" },
                    { "f89daeda-da42-4ecc-914f-399088371cf8", null, "User", "USER" }
                });
        }
    }
}
