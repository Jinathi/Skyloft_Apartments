// Models/UnitImage.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkyloftApartments.Models
{
    public class UnitImage
    {
        [Key]
        public int ImageID { get; set; }
        
        [ForeignKey("Unit")]
        public int UnitID { get; set; }
        
        [Required]
        [StringLength(255)]
        public string ImageURL { get; set; }
        
        [StringLength(200)]
        public string? ImageDescription { get; set; }
        
        public bool IsPrimary { get; set; } = false;
        public int DisplayOrder { get; set; } = 1;
        public DateTime UploadedDate { get; set; } = DateTime.Now;
        
        // Navigation Property
        public virtual Unit Unit { get; set; }
    }
}