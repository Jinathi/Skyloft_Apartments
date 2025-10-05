// Data/AppDbContext.cs
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // DbSets for all tables
    public DbSet<Apartment> Apartments { get; set; }
    public DbSet<Guest> Guests { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<Amenity> Amenities { get; set; }
    public DbSet<ApartmentAmenity> ApartmentAmenities { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<ContactSubmission> ContactSubmissions { get; set; }
    public DbSet<BlockedDate> BlockedDates { get; set; }
    public DbSet<PricingRule> PricingRules { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<ApartmentOwner> ApartmentOwners { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure many-to-many relationship
        modelBuilder.Entity<ApartmentAmenity>()
            .HasKey(aa => new { aa.ApartmentID, aa.AmenityID });

        // Configure unique constraints
        modelBuilder.Entity<Guest>()
            .HasIndex(g => g.Email)
            .IsUnique();

        modelBuilder.Entity<Booking>()
            .HasIndex(b => b.BookingReference)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        // Configure decimal precision
        modelBuilder.Entity<Apartment>()
            .Property(a => a.BasePrice)
            .HasPrecision(10, 2);

        modelBuilder.Entity<Booking>()
            .Property(b => b.TotalAmount)
            .HasPrecision(10, 2);

        modelBuilder.Entity<Payment>()
            .Property(p => p.Amount)
            .HasPrecision(10, 2);

        modelBuilder.Entity<PricingRule>()
            .Property(p => p.PriceMultiplier)
            .HasPrecision(5, 2);

        modelBuilder.Entity<PricingRule>()
            .Property(p => p.FixedPrice)
            .HasPrecision(10, 2);

        modelBuilder.Entity<ApartmentOwner>()
            .Property(ao => ao.OwnershipPercentage)
            .HasPrecision(5, 2);

        // Configure default values
        modelBuilder.Entity<Apartment>()
            .Property(a => a.IsActive)
            .HasDefaultValue(true);

        modelBuilder.Entity<Booking>()
            .Property(b => b.Status)
            .HasDefaultValue("Pending");

        modelBuilder.Entity<Booking>()
            .Property(b => b.PaymentStatus)
            .HasDefaultValue("Pending");

        modelBuilder.Entity<Guest>()
            .Property(g => g.CreatedDate)
            .HasDefaultValueSql("GETUTCDATE()");

        modelBuilder.Entity<ContactSubmission>()
            .Property(c => c.Status)
            .HasDefaultValue("New");

        modelBuilder.Entity<Review>()
            .Property(r => r.IsApproved)
            .HasDefaultValue(false);
    }
}