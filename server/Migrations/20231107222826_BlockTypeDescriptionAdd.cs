using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class BlockTypeDescriptionAdd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "BlockTypes",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "BlockTypes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Start with plain text", "Paragraph" });

            migrationBuilder.UpdateData(
                table: "BlockTypes",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Capture a code snipet", "Code-Block" });

            migrationBuilder.UpdateData(
                table: "BlockTypes",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Upload or embed with a link", "Image" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "BlockTypes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Name" },
                values: new object[] { null, "subheading" });

            migrationBuilder.UpdateData(
                table: "BlockTypes",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "Name" },
                values: new object[] { null, "paragraph" });

            migrationBuilder.UpdateData(
                table: "BlockTypes",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "Name" },
                values: new object[] { null, "code-block" });

            migrationBuilder.InsertData(
                table: "BlockTypes",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { 4, null, "image" });
        }
    }
}
