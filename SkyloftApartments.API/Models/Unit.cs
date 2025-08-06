// Models/Unit.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkyloftApartments.Models
{
    public class Unit
    {
        [Key]
        public int UnitID { get; set; }
        
        [ForeignKey("Property")]
        public int PropertyID { get; set; }
        
        [Required]
        [StringLength(10)]
        public string UnitNumber { get; set; }
        
        [StringLength(50)]
        public string? UnitType { get; set; }
        
        public int Bedrooms { get; set; } = 1;
        
        [Column(TypeName = "decimal(2,1)")]
        public decimal Bathrooms { get; set; } = 1.0m;
        
        public int? SquareFeet { get; set; }
        
        [Column(TypeName = "decimal(10,2)")]
        public decimal MonthlyRent { get; set; }
        
        [Column(TypeName = "decimal(10,2)")]
        public decimal? SecurityDeposit { get; set; }
        
        public bool IsAvailable { get; set; } = true;
        
        [StringLength(1000)]
        public string? Description { get; set; }
        
        [StringLength(500)]
        public string? Amenities { get; set; }
        
        public int? FloorNumber { get; set; }
        public bool HasBalcony { get; set; } = false;
        public bool HasParking { get; set; } = false;
        public bool IsFurnished { get; set; } = false;
        
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime UpdatedDate { get; set; } = DateTime.Now;
        
        // Navigation Properties
        public virtual Property Property { get; set; }
        public virtual ICollection<UnitImage> Images { get; set; } = new List<UnitImage>();
        public virtual ICollection<Inquiry> Inquiries { get; set; } = new List<Inquiry>();
        
        // Helper Properties
        [NotMapped]
        public List<string> AmenitiesList => 
            string.IsNullOrEmpty(Amenities) ? new List<string>() : Amenities.Split(',').ToList();
        
        [NotMapped]
        public string PrimaryImageUrl => 
            Images?.FirstOrDefault(i => i.IsPrimary)?.ImageURL ?? "/images/default-apartment.jpg";
    }
}