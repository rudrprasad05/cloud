using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class Share : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a6b8962e-0911-43c2-9578-a93c8a790eaf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e0f369c1-3731-4d5c-8228-ba7247d07fc3");

            migrationBuilder.CreateTable(
                name: "Share",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", nullable: false, collation: "utf8mb4_general_ci"),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Url = table.Column<string>(type: "longtext", nullable: false, collation: "utf8mb4_general_ci"),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Share", x => x.Id);
                })
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "SharedUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", nullable: false, collation: "utf8mb4_general_ci"),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false, collation: "utf8mb4_general_ci"),
                    ShareId = table.Column<string>(type: "varchar(255)", nullable: false, collation: "utf8mb4_general_ci"),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SharedUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SharedUsers_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SharedUsers_Share_ShareId",
                        column: x => x.ShareId,
                        principalTable: "Share",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "159b73bb-5571-4e78-812b-c0024616101d", null, "Admin", "ADMIN" },
                    { "e3821077-abe4-4ff5-a09f-8fd5213c22d4", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_SharedUsers_ShareId",
                table: "SharedUsers",
                column: "ShareId");

            migrationBuilder.CreateIndex(
                name: "IX_SharedUsers_UserId",
                table: "SharedUsers",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SharedUsers");

            migrationBuilder.DropTable(
                name: "Share");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "159b73bb-5571-4e78-812b-c0024616101d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e3821077-abe4-4ff5-a09f-8fd5213c22d4");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a6b8962e-0911-43c2-9578-a93c8a790eaf", null, "Admin", "ADMIN" },
                    { "e0f369c1-3731-4d5c-8228-ba7247d07fc3", null, "User", "USER" }
                });
        }
    }
}
