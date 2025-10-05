// Models/Apartment.cs
using System.ComponentModel.DataAnnotations;

public class Apartment
{
    [Key]
    public int ApartmentID { get; set; }
    
    [Required]
    [StringLength(100)]
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    [Required]
    [Range(0, 10000)]
    public decimal BasePrice { get; set; }
    
    [Required]
    public int MaxGuests { get; set; }
    
    [Required]
    public int Bedrooms { get; set; }
    
    [Required]
    public int Bathrooms { get; set; }
    
    public int? SizeSqFt { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    public virtual ICollection<ApartmentAmenity> ApartmentAmenities { get; set; } = new List<ApartmentAmenity>();
    public virtual ICollection<BlockedDate> BlockedDates { get; set; } = new List<BlockedDate>();
    public virtual ICollection<PricingRule> PricingRules { get; set; } = new List<PricingRule>();
}