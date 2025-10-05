// Models/ContactSubmission.cs
using System.ComponentModel.DataAnnotations;

public class ContactSubmission
{
    [Key]
    public int SubmissionID { get; set; }
    
    [Required]
    [StringLength(100)]
    public string Name { get; set; }
    
    [Required]
    [EmailAddress]
    [StringLength(255)]
    public string Email { get; set; }
    
    [StringLength(255)]
    public string? Subject { get; set; }
    
    [Required]
    public string Message { get; set; }
    
    [StringLength(20)]
    public string Status { get; set; } = "New"; // New, InProgress, Resolved
    
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
}