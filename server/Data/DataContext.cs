using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<Section> Sections => Set<Section>();
    public DbSet<Block> Blocks => Set<Block>();
    public DbSet<BlockType> BlockTypes => Set<BlockType>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BlockType>().HasData(
            new BlockType() { Id = 1, Name = "subheading" },
            new BlockType() { Id = 2, Name = "paragraph" },
            new BlockType() { Id = 3, Name = "code-block" },
            new BlockType() { Id = 4, Name = "image" }
        );
        base.OnModelCreating(modelBuilder);
    }

}