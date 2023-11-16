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

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries()
            .Where(e => e.Entity is BaseEntity && e.Entity is not null))
        {
            if (entry.State == EntityState.Deleted)
            {
                entry.State = EntityState.Modified;
                entry.CurrentValues["IsDeleted"] = true;
            }
        }

        return await base.SaveChangesAsync(cancellationToken);
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BlockType>().HasData(
            new BlockType() { Id = 1, Name = "Paragraph", Description = "Start with plain text" },
            new BlockType() { Id = 2, Name = "Code", Description = "Capture a code snipet" },
            new BlockType() { Id = 3, Name = "Image", Description = "Upload or embed with a link" }
        );

        modelBuilder.Entity<Project>().HasQueryFilter(x => !x.IsDeleted);
        modelBuilder.Entity<Section>().HasQueryFilter(x => !x.IsDeleted);
        modelBuilder.Entity<Block>().HasQueryFilter(x => !x.IsDeleted);

        base.OnModelCreating(modelBuilder);
    }

}