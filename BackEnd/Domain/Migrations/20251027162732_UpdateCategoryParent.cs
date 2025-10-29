using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCategoryParent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "tblCategories",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ParentId",
                table: "tblCategories",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "tblCategories",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_tblCategories_ParentId",
                table: "tblCategories",
                column: "ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblCategories_tblCategories_ParentId",
                table: "tblCategories",
                column: "ParentId",
                principalTable: "tblCategories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblCategories_tblCategories_ParentId",
                table: "tblCategories");

            migrationBuilder.DropIndex(
                name: "IX_tblCategories_ParentId",
                table: "tblCategories");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "tblCategories");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "tblCategories");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "tblCategories");
        }
    }
}
