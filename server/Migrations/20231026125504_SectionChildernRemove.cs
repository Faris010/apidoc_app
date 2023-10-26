using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class SectionChildernRemove : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sections_Sections_SectionId",
                table: "Sections");

            migrationBuilder.DropIndex(
                name: "IX_Sections_SectionId",
                table: "Sections");

            migrationBuilder.DropColumn(
                name: "SectionId",
                table: "Sections");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SectionId",
                table: "Sections",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sections_SectionId",
                table: "Sections",
                column: "SectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sections_Sections_SectionId",
                table: "Sections",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id");
        }
    }
}
