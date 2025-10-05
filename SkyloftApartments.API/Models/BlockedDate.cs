// Models/BlockedDate.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class BlockedDate
{
    [Key]
    public int BlockID { get; set; }
    
    [Required]
    public int ApartmentID { get; set; }
    
    [Required]
    public DateTime StartDate { get; set; }
    
    [Required]
    public DateTime EndDate { get; set; }
    
    [StringLength(255)]
    public string? Reason { get; set; }
    
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    [ForeignKey("ApartmentID")]
    public virtual Apartment Apartment { get; set; }
}