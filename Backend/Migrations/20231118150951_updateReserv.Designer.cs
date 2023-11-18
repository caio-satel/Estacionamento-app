﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace testeFds.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20231118150951_updateReserv")]
    partial class updateReserv
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.11");

            modelBuilder.Entity("Carro", b =>
                {
                    b.Property<string>("Placa")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClienteCpf")
                        .HasColumnType("TEXT");

                    b.Property<string>("Cliente_Cpf")
                        .HasColumnType("TEXT");

                    b.Property<string>("Cor")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Modelo")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Placa");

                    b.HasIndex("ClienteCpf");

                    b.ToTable("Carros");
                });

            modelBuilder.Entity("CartaoAcesso", b =>
                {
                    b.Property<int>("IdCartao")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Cliente_Cpf")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("DataValidade")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("IdCartao");

                    b.ToTable("CartaoAcessos");
                });

            modelBuilder.Entity("Cliente", b =>
                {
                    b.Property<string>("Cpf")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Telefone")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Cpf");

                    b.ToTable("Clientes");
                });

            modelBuilder.Entity("Conta", b =>
                {
                    b.Property<int>("IdConta")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Cliente_Cpf")
                        .HasColumnType("TEXT");

                    b.Property<float?>("Total_gasto")
                        .IsRequired()
                        .HasColumnType("REAL");

                    b.HasKey("IdConta");

                    b.ToTable("Contas");
                });

            modelBuilder.Entity("Funcionario", b =>
                {
                    b.Property<int>("IdFuncionario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Cargo")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Matricula")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("IdFuncionario");

                    b.ToTable("Funcionarios");
                });

            modelBuilder.Entity("Pagamento", b =>
                {
                    b.Property<int>("Codigo")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Codigo_Ticket")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Conta_Id")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("Data_hora_pagamento")
                        .HasColumnType("TEXT");

                    b.Property<float?>("Valor_pago")
                        .IsRequired()
                        .HasColumnType("REAL");

                    b.HasKey("Codigo");

                    b.ToTable("Pagamentos");
                });

            modelBuilder.Entity("RegistroEntradaSaida", b =>
                {
                    b.Property<int?>("RegistroId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Carro_Placa")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("DataEntrada")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("DataSaida")
                        .HasColumnType("TEXT");

                    b.Property<int?>("Vaga_Id")
                        .HasColumnType("INTEGER");

                    b.HasKey("RegistroId");

                    b.ToTable("RegistroEntradasSaidas");
                });

            modelBuilder.Entity("Reserva", b =>
                {
                    b.Property<int?>("ReservaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Cliente_Cpf")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("Data_hora_reserva")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("Vaga_Id")
                        .HasColumnType("INTEGER");

                    b.HasKey("ReservaId");

                    b.ToTable("Reservas");
                });

            modelBuilder.Entity("ServicoExtra", b =>
                {
                    b.Property<int?>("ServicoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Carro_Placa")
                        .HasColumnType("TEXT");

                    b.Property<string>("Cliente_Cpf")
                        .HasColumnType("TEXT");

                    b.Property<float>("Custo")
                        .HasColumnType("REAL");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("Funcionario_Id")
                        .HasColumnType("INTEGER");

                    b.HasKey("ServicoId");

                    b.ToTable("ServicoExtras");
                });

            modelBuilder.Entity("Tarifario", b =>
                {
                    b.Property<int?>("IdTarifario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<float?>("Tarifa_diaria")
                        .IsRequired()
                        .HasColumnType("REAL");

                    b.Property<float?>("Tarifa_hora")
                        .IsRequired()
                        .HasColumnType("REAL");

                    b.Property<float?>("Tarifa_mensal")
                        .IsRequired()
                        .HasColumnType("REAL");

                    b.HasKey("IdTarifario");

                    b.ToTable("Tarifarios");
                });

            modelBuilder.Entity("Ticket", b =>
                {
                    b.Property<int?>("Codigo")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Carro_Placa")
                        .HasColumnType("TEXT");

                    b.Property<string>("Cliente_Cpf")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("Data_hora_entrada")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("Data_hora_saida")
                        .HasColumnType("TEXT");

                    b.Property<float?>("Total")
                        .HasColumnType("REAL");

                    b.HasKey("Codigo");

                    b.ToTable("Tickets");
                });

            modelBuilder.Entity("Vaga", b =>
                {
                    b.Property<int?>("VagaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Carro_Placa")
                        .HasColumnType("TEXT");

                    b.Property<bool?>("Ocupada")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Tipo")
                        .HasColumnType("TEXT");

                    b.HasKey("VagaId");

                    b.ToTable("Vagas");
                });

            modelBuilder.Entity("Carro", b =>
                {
                    b.HasOne("Cliente", null)
                        .WithMany("Carros")
                        .HasForeignKey("ClienteCpf");
                });

            modelBuilder.Entity("Cliente", b =>
                {
                    b.Navigation("Carros");
                });
#pragma warning restore 612, 618
        }
    }
}