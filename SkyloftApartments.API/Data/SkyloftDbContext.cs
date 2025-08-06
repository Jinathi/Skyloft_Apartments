// Data/SkyloftDbContext.cs
using Microsoft.EntityFrameworkCore;
using SkyloftApartments.Models;

namespace SkyloftApartments.Data
{
    public class SkyloftDbContext : DbContext
    {
        public SkyloftDbContext(DbContextOptions<SkyloftDbContext> options) : base(options) { }
        
        public DbSet<Property> Properties { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<UnitImage> UnitImages { get; set; }
        public DbSet<Inquiry> Inquiries { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Configure relationships
            modelBuilder.Entity<Unit>()
                .HasOne(u => u.Property)
                .WithMany(p => p.Units)
                .HasForeignKey(u => u.PropertyID)
                .OnDelete(DeleteBehavior.Restrict);
            
            modelBuilder.Entity<UnitImage>()
                .HasOne(ui => ui.Unit)
                .WithMany(u => u.Images)
                .HasForeignKey(ui => ui.UnitID)
                .OnDelete(DeleteBehavior.Cascade);
            
            modelBuilder.Entity<Inquiry>()
                .HasOne(i => i.Unit)
                .WithMany(u => u.Inquiries)
                .HasForeignKey(i => i.UnitID)
                .OnDelete(DeleteBehavior.Restrict);
            
            // Configure decimal precision
            modelBuilder.Entity<Unit>()
                .Property(u => u.MonthlyRent)
                .HasPrecision(10, 2);
            
            modelBuilder.Entity<Unit>()
                .Property(u => u.SecurityDeposit)
                .HasPrecision(10, 2);
            
            modelBuilder.Entity<Unit>()
                .Property(u => u.Bathrooms)
                .HasPrecision(2, 1);
        }
    }
}