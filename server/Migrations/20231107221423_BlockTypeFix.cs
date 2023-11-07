using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class BlockTypeFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Blocks_BlockTypeId",
                table: "Blocks");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "BlockTypes",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "BlockTypes",
                keyColumn: "Id",
                keyValue: 1,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "BlockTypes",
                keyColumn: "Id",
                keyValue: 2,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "BlockTypes",
                keyColumn: "Id",
                keyValue: 3,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "BlockTypes",
                keyColumn: "Id",
                keyValue: 4,
                column: "Description",
                value: null);

            migrationBuilder.CreateIndex(
                name: "IX_Blocks_BlockTypeId",
                table: "Blocks",
                column: "BlockTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Blocks_BlockTypeId",
                table: "Blocks");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "BlockTypes");

            migrationBuilder.CreateIndex(
                name: "IX_Blocks_BlockTypeId",
                table: "Blocks",
                column: "BlockTypeId",
                unique: true);
        }
    }
}
