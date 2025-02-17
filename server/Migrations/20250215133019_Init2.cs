using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class Init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "810c04f8-a365-4532-88e4-09de1e00a8bb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c0fd5d05-caad-4294-83a3-189c22e0f987");

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
                    { "643195a9-8d04-44e6-b39f-baedcb5b0710", null, "Admin", "ADMIN" },
                    { "a4b893e7-65f3-4abe-a590-5847e425ad0b", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "643195a9-8d04-44e6-b39f-baedcb5b0710");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a4b893e7-65f3-4abe-a590-5847e425ad0b");

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
                    { "810c04f8-a365-4532-88e4-09de1e00a8bb", null, "Admin", "ADMIN" },
                    { "c0fd5d05-caad-4294-83a3-189c22e0f987", null, "User", "USER" }
                });
        }
    }
}
