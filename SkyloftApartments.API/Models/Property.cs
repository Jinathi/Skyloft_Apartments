// Models/Property.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkyloftApartments.Models
{
    public class Property
    {
        [Key]
        public int PropertyID { get; set; }
        
        [Required]
        [StringLength(100)]
        public string PropertyName { get; set; }
        
        [Required]
        [StringLength(255)]
        public string Address { get; set; }
        
        [StringLength(50)]
        public string City { get; set; } = "Kandy";
        
        [StringLength(1000)]
        public string? Description { get; set; }
        
        [StringLength(20)]
        public string? ContactPhone { get; set; }
        
        [StringLength(100)]
        public string? ContactEmail { get; set; }
        
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public bool IsActive { get; set; } = true;
        
        // Navigation Property
        public virtual ICollection<Unit> Units { get; set; } = new List<Unit>();
    }
}