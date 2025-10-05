// Models/Payment.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Payment
{
    [Key]
    public int PaymentID { get; set; }
    
    [Required]
    public int BookingID { get; set; }
    
    [Required]
    [Range(0, 100000)]
    public decimal Amount { get; set; }
    
    [StringLength(50)]
    public string? PaymentMethod { get; set; } // CreditCard, BankTransfer, etc.
    
    public DateTime? PaymentDate { get; set; }
    
    [StringLength(100)]
    public string? TransactionID { get; set; }
    
    [StringLength(20)]
    public string Status { get; set; } = "Pending"; // Pending, Completed, Failed, Refunded
    
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    [ForeignKey("BookingID")]
    public virtual Booking Booking { get; set; }
}