using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class BlockUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CodeBlock",
                table: "Blocks");

            migrationBuilder.DropColumn(
                name: "Paragraph",
                table: "Blocks");

            migrationBuilder.DropColumn(
                name: "Subheading",
                table: "Blocks");

            migrationBuilder.CreateIndex(
                name: "IX_Blocks_SectionId",
                table: "Blocks",
                column: "SectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Blocks_Sections_SectionId",
                table: "Blocks",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blocks_Sections_SectionId",
                table: "Blocks");

            migrationBuilder.DropIndex(
                name: "IX_Blocks_SectionId",
                table: "Blocks");

            migrationBuilder.AddColumn<string>(
                name: "CodeBlock",
                table: "Blocks",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Paragraph",
                table: "Blocks",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Subheading",
                table: "Blocks",
                type: "text",
                nullable: true);
        }
    }
}
