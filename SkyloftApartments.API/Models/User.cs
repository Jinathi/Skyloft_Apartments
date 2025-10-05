// Models/User.cs
using System.ComponentModel.DataAnnotations;

public class User
{
    [Key]
    public int UserID { get; set; }
    
    [Required]
    [StringLength(50)]
    public string Username { get; set; }
    
    [Required]
    [EmailAddress]
    [StringLength(255)]
    public string Email { get; set; }
    
    [Required]
    public string PasswordHash { get; set; }
    
    [Required]
    [StringLength(50)]
    public string FirstName { get; set; }
    
    [Required]
    [StringLength(50)]
    public string LastName { get; set; }
    
    [Required]
    [StringLength(50)]
    public string Role { get; set; } // Admin, Owner, Staff
    
    public bool IsActive { get; set; } = true;
    
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    
    public DateTime? LastLogin { get; set; }
    
    // Navigation properties
    public virtual ICollection<ApartmentOwner> ApartmentOwnerships { get; set; } = new List<ApartmentOwner>();
}