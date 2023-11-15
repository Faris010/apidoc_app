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

    public override int SaveChanges()
    {
        foreach (var entry in ChangeTracker.Entries())
        {
            if (entry.Entity is Project project && entry.State == EntityState.Deleted)
            {
                entry.State = EntityState.Modified;
                project.IsDeleted = true;
            }
        }

        return base.SaveChanges();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BlockType>().HasData(
            new BlockType() { Id = 1, Name = "Paragraph", Description = "Start with plain text" },
            new BlockType() { Id = 2, Name = "Code", Description = "Capture a code snipet" },
            new BlockType() { Id = 3, Name = "Image", Description = "Upload or embed with a link" }
        );

        base.OnModelCreating(modelBuilder);
    }

}