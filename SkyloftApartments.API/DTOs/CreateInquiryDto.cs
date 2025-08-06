// DTOs/CreateInquiryDto.cs
using System.ComponentModel.DataAnnotations;

namespace SkyloftApartments.DTOs
{
    public class CreateInquiryDto
    {
        public int? UnitID { get; set; }
        
        [Required]
        [StringLength(100)]
        public string FullName { get; set; } = "";
        
        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; } = "";
        
        [StringLength(20)]
        public string? Phone { get; set; }
        
        [StringLength(1000)]
        public string? Message { get; set; }
        
        public DateTime? PreferredMoveInDate { get; set; }
    }
}