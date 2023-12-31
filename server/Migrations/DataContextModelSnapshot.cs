﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using server.Data;

#nullable disable

namespace server.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("server.Models.Block", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("BlockTypeId")
                        .HasColumnType("integer");

                    b.Property<string>("Content")
                        .HasColumnType("text");

                    b.Property<string>("Image")
                        .HasColumnType("text");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Language")
                        .HasColumnType("text");

                    b.Property<Guid>("SectionId")
                        .HasColumnType("uuid");

                    b.Property<int>("SortOrder")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("BlockTypeId");

                    b.HasIndex("SectionId");

                    b.ToTable("Blocks");
                });

            modelBuilder.Entity("server.Models.BlockType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("BlockTypes");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "Start with plain text",
                            Name = "Paragraph"
                        },
                        new
                        {
                            Id = 2,
                            Description = "Capture a code snipet",
                            Name = "Code"
                        },
                        new
                        {
                            Id = 3,
                            Description = "Upload or embed with a link",
                            Name = "Image"
                        });
                });

            modelBuilder.Entity("server.Models.Project", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Logo")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ProjectName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("server.Models.Section", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid?>("ParentId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("ProjectId")
                        .HasColumnType("uuid");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ProjectId");

                    b.ToTable("Sections");
                });

            modelBuilder.Entity("server.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");


                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("server.Models.Block", b =>
                {
                    b.HasOne("server.Models.BlockType", "BlockTypes")
                        .WithMany()
                        .HasForeignKey("BlockTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Models.Section", null)
                        .WithMany("Blocks")
                        .HasForeignKey("SectionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BlockTypes");
                });

            modelBuilder.Entity("server.Models.Section", b =>
                {
                    b.HasOne("server.Models.Project", null)
                        .WithMany("Sections")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("server.Models.Project", b =>
                {
                    b.Navigation("Sections");
                });

            modelBuilder.Entity("server.Models.Section", b =>
                {
                    b.Navigation("Blocks");
                });
#pragma warning restore 612, 618
        }
    }
}
