// Models/Booking.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Booking
{
    [Key]
    public int BookingID { get; set; }
    
    [Required]
    [StringLength(20)]
    public string BookingReference { get; set; }
    
    [Required]
    public int ApartmentID { get; set; }
    
    [Required]
    public int GuestID { get; set; }
    
    [Required]
    public DateTime CheckInDate { get; set; }
    
    [Required]
    public DateTime CheckOutDate { get; set; }
    
    [Required]
    [Range(1, 10)]
    public int NumberOfGuests { get; set; }
    
    [Required]
    [Range(0, 100000)]
    public decimal TotalAmount { get; set; }
    
    [StringLength(20)]
    public string Status { get; set; } = "Pending"; // Pending, Confirmed, CheckedIn, CheckedOut, Cancelled
    
    [StringLength(20)]
    public string PaymentStatus { get; set; } = "Pending"; // Pending, Paid, Refunded, Failed
    
    public string? SpecialRequests { get; set; }
    
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    [ForeignKey("ApartmentID")]
    public virtual Apartment Apartment { get; set; }
    
    [ForeignKey("GuestID")]
    public virtual Guest Guest { get; set; }
    
    public virtual Payment Payment { get; set; }
    public virtual Review Review { get; set; }
    
    // Computed property for number of nights
    [NotMapped]
    public int NumberOfNights => (CheckOutDate - CheckInDate).Days;
}