using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace testeFds.Migrations
{
    /// <inheritdoc />
    public partial class v1CorrecaoModelsClienteCarro : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Carros_Clientes_Cliente_Cpf",
                table: "Carros");

            migrationBuilder.DropIndex(
                name: "IX_Carros_Cliente_Cpf",
                table: "Carros");

            migrationBuilder.AddColumn<int>(
                name: "ClienteCpf",
                table: "Carros",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Carros_ClienteCpf",
                table: "Carros",
                column: "ClienteCpf");

            migrationBuilder.AddForeignKey(
                name: "FK_Carros_Clientes_ClienteCpf",
                table: "Carros",
                column: "ClienteCpf",
                principalTable: "Clientes",
                principalColumn: "Cpf");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Carros_Clientes_ClienteCpf",
                table: "Carros");

            migrationBuilder.DropIndex(
                name: "IX_Carros_ClienteCpf",
                table: "Carros");

            migrationBuilder.DropColumn(
                name: "ClienteCpf",
                table: "Carros");

            migrationBuilder.CreateIndex(
                name: "IX_Carros_Cliente_Cpf",
                table: "Carros",
                column: "Cliente_Cpf");

            migrationBuilder.AddForeignKey(
                name: "FK_Carros_Clientes_Cliente_Cpf",
                table: "Carros",
                column: "Cliente_Cpf",
                principalTable: "Clientes",
                principalColumn: "Cpf");
        }
    }
}
