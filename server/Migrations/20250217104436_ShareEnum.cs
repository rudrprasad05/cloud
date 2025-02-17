using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class ShareEnum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "643195a9-8d04-44e6-b39f-baedcb5b0710");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a4b893e7-65f3-4abe-a590-5847e425ad0b");

            migrationBuilder.AlterColumn<string>(
                name: "Type",
                table: "Share",
                type: "longtext",
                nullable: false,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8ef7890f-89b8-49b7-8991-d4628446b124", null, "Admin", "ADMIN" },
                    { "f89daeda-da42-4ecc-914f-399088371cf8", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8ef7890f-89b8-49b7-8991-d4628446b124");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f89daeda-da42-4ecc-914f-399088371cf8");

            migrationBuilder.AlterColumn<int>(
                name: "Type",
                table: "Share",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "643195a9-8d04-44e6-b39f-baedcb5b0710", null, "Admin", "ADMIN" },
                    { "a4b893e7-65f3-4abe-a590-5847e425ad0b", null, "User", "USER" }
                });
        }
    }
}
