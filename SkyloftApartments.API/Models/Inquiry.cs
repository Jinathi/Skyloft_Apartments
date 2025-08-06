// Models/Inquiry.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkyloftApartments.Models
{
    public class Inquiry
    {
        [Key]
        public int InquiryID { get; set; }
        
        [ForeignKey("Unit")]
        public int? UnitID { get; set; }
        
        [Required]
        [StringLength(100)]
        public string FullName { get; set; }
        
        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }
        
        [StringLength(20)]
        public string? Phone { get; set; }
        
        [StringLength(1000)]
        public string? Message { get; set; }
        
        public DateTime? PreferredMoveInDate { get; set; }
        public DateTime InquiryDate { get; set; } = DateTime.Now;
        
        [StringLength(20)]
        public string Status { get; set; } = "New";
        
        [StringLength(500)]
        public string? AdminNotes { get; set; }
        
        // Navigation Property
        public virtual Unit? Unit { get; set; }
    }
}
