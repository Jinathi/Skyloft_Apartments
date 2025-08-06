// DTOs/UnitDetailDto.cs
namespace SkyloftApartments.DTOs
{
    public class UnitDetailDto
    {
        public int UnitID { get; set; }
        public string UnitNumber { get; set; }
        public string UnitType { get; set; }
        public int Bedrooms { get; set; }
        public decimal Bathrooms { get; set; }
        public int? SquareFeet { get; set; }
        public decimal MonthlyRent { get; set; }
        public decimal? SecurityDeposit { get; set; }
        public string Description { get; set; }
        public List<string> Amenities { get; set; } = new();
        public bool HasBalcony { get; set; }
        public bool HasParking { get; set; }
        public bool IsFurnished { get; set; }
        public int FloorNumber { get; set; }
        public List<UnitImageDto> Images { get; set; } = new();
        
        // Property Info
        public string PropertyName { get; set; }
        public string PropertyAddress { get; set; }
        public string ContactPhone { get; set; }
        public string ContactEmail { get; set; }
    }
}