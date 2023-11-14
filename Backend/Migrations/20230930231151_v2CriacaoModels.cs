using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace testeFds.Migrations
{
    /// <inheritdoc />
    public partial class v2CriacaoModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CartaoAcessos",
                columns: table => new
                {
                    IdCartao = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DataValidade = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Cliente_Cpf = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartaoAcessos", x => x.IdCartao);
                });

            migrationBuilder.CreateTable(
                name: "Contas",
                columns: table => new
                {
                    IdConta = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Total_gasto = table.Column<float>(type: "REAL", nullable: false),
                    Cliente_Cpf = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contas", x => x.IdConta);
                });

            migrationBuilder.CreateTable(
                name: "Funcionarios",
                columns: table => new
                {
                    IdFuncionario = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: false),
                    Matricula = table.Column<string>(type: "TEXT", nullable: false),
                    Cargo = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Funcionarios", x => x.IdFuncionario);
                });

            migrationBuilder.CreateTable(
                name: "Pagamentos",
                columns: table => new
                {
                    Codigo = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Data_hora_pagamento = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Valor_pago = table.Column<float>(type: "REAL", nullable: false),
                    Conta_Id = table.Column<int>(type: "INTEGER", nullable: true),
                    Codigo_Ticket = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pagamentos", x => x.Codigo);
                });

            migrationBuilder.CreateTable(
                name: "RegistroEntradasSaidas",
                columns: table => new
                {
                    RegistroId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DataEntrada = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DataSaida = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Carro_Placa = table.Column<string>(type: "TEXT", nullable: true),
                    Vaga_Id = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistroEntradasSaidas", x => x.RegistroId);
                });

            migrationBuilder.CreateTable(
                name: "Reservas",
                columns: table => new
                {
                    ReservaId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Data_hora_reserva = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Cliente_Cpf = table.Column<int>(type: "INTEGER", nullable: false),
                    Vaga_Id = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservas", x => x.ReservaId);
                });

            migrationBuilder.CreateTable(
                name: "ServicoExtras",
                columns: table => new
                {
                    ServicoId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Descricao = table.Column<string>(type: "TEXT", nullable: false),
                    Custo = table.Column<decimal>(type: "TEXT", nullable: false),
                    Cliente_Cpf = table.Column<string>(type: "TEXT", nullable: true),
                    Carro_Placa = table.Column<string>(type: "TEXT", nullable: true),
                    Funcionario_Id = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServicoExtras", x => x.ServicoId);
                });

            migrationBuilder.CreateTable(
                name: "Tarifarios",
                columns: table => new
                {
                    IdTarifario = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Tarifa_hora = table.Column<float>(type: "REAL", nullable: false),
                    Tarifa_diaria = table.Column<float>(type: "REAL", nullable: false),
                    Tarifa_mensal = table.Column<float>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tarifarios", x => x.IdTarifario);
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    Codigo = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Data_hora_entrada = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Data_hora_saida = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Total = table.Column<float>(type: "REAL", nullable: true),
                    Cliente_Cpf = table.Column<int>(type: "INTEGER", nullable: false),
                    Carro_Placa = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Codigo);
                });

            migrationBuilder.CreateTable(
                name: "Vagas",
                columns: table => new
                {
                    VagaId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Ocupada = table.Column<bool>(type: "INTEGER", nullable: true),
                    Tipo = table.Column<string>(type: "TEXT", nullable: true),
                    Carro_Placa = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vagas", x => x.VagaId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CartaoAcessos");

            migrationBuilder.DropTable(
                name: "Contas");

            migrationBuilder.DropTable(
                name: "Funcionarios");

            migrationBuilder.DropTable(
                name: "Pagamentos");

            migrationBuilder.DropTable(
                name: "RegistroEntradasSaidas");

            migrationBuilder.DropTable(
                name: "Reservas");

            migrationBuilder.DropTable(
                name: "ServicoExtras");

            migrationBuilder.DropTable(
                name: "Tarifarios");

            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropTable(
                name: "Vagas");
        }
    }
}
