using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace testeFds.Migrations
{
    /// <inheritdoc />
    public partial class v1PrimeiraMigracao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clientes",
                columns: table => new
                {
                    Cpf = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: false),
                    Telefone = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clientes", x => x.Cpf);
                });

            migrationBuilder.CreateTable(
                name: "Carros",
                columns: table => new
                {
                    Placa = table.Column<string>(type: "TEXT", nullable: false),
                    Modelo = table.Column<string>(type: "TEXT", nullable: false),
                    Cor = table.Column<string>(type: "TEXT", nullable: false),
                    Cliente_Cpf = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carros", x => x.Placa);
                    table.ForeignKey(
                        name: "FK_Carros_Clientes_Cliente_Cpf",
                        column: x => x.Cliente_Cpf,
                        principalTable: "Clientes",
                        principalColumn: "Cpf");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Carros_Cliente_Cpf",
                table: "Carros",
                column: "Cliente_Cpf");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Carros");

            migrationBuilder.DropTable(
                name: "Clientes");
        }
    }
}
