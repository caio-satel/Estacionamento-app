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
    [Migration("20230930163628_v1CorrecaoModelsClienteCarro")]
    partial class v1CorrecaoModelsClienteCarro
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

                    b.Property<int?>("ClienteCpf")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Cliente_Cpf")
                        .HasColumnType("INTEGER");

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

            modelBuilder.Entity("Cliente", b =>
                {
                    b.Property<int?>("Cpf")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Telefone")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Cpf");

                    b.ToTable("Clientes");
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
