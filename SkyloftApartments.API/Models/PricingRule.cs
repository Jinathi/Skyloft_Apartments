// Models/PricingRule.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class PricingRule
{
    [Key]
    public int RuleID { get; set; }
    
    [Required]
    public int ApartmentID { get; set; }
    
    [Required]
    public DateTime StartDate { get; set; }
    
    [Required]
    public DateTime EndDate { get; set; }
    
    [Range(0.1, 10.0)]
    public decimal PriceMultiplier { get; set; } = 1.00m;
    
    [Range(0, 100000)]
    public decimal? FixedPrice { get; set; }
    
    [StringLength(255)]
    public string? Description { get; set; }
    
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    [ForeignKey("ApartmentID")]
    public virtual Apartment Apartment { get; set; }
}