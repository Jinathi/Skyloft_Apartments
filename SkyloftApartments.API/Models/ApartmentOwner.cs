// Models/ApartmentOwner.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class ApartmentOwner
{
    [Key]
    public int OwnerID { get; set; }
    
    [Required]
    public int UserID { get; set; }
    
    [Required]
    public int ApartmentID { get; set; }
    
    [Range(0, 100)]
    public decimal OwnershipPercentage { get; set; } = 100.00m;
    
    // Navigation properties
    [ForeignKey("UserID")]
    public virtual User User { get; set; }
    
    [ForeignKey("ApartmentID")]
    public virtual Apartment Apartment { get; set; }
}