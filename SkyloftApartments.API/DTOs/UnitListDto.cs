// DTOs/UnitListDto.cs
namespace SkyloftApartments.DTOs
{
    public class UnitListDto
    {
        public int UnitID { get; set; }
        public string UnitNumber { get; set; }
        public string UnitType { get; set; }
        public int Bedrooms { get; set; }
        public decimal Bathrooms { get; set; }
        public int? SquareFeet { get; set; }
        public decimal MonthlyRent { get; set; }
        public bool IsAvailable { get; set; }
        public string Description { get; set; }
        public List<string> Amenities { get; set; } = new();
        public bool HasBalcony { get; set; }
        public bool HasParking { get; set; }
        public bool IsFurnished { get; set; }
        public string PrimaryImageUrl { get; set; }
        public int FloorNumber { get; set; }
    }
}