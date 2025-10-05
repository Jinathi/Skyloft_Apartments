// Models/ApartmentAmenity.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class ApartmentAmenity
{
    public int ApartmentID { get; set; }
    public int AmenityID { get; set; }

    // Navigation properties
    [ForeignKey("ApartmentID")]
    public virtual Apartment Apartment { get; set; }

    [ForeignKey("AmenityID")]
    public virtual Amenity Amenity { get; set; }
}