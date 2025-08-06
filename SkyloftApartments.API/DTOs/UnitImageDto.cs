// DTOs/UnitImageDto.cs
namespace SkyloftApartments.DTOs
{
    public class UnitImageDto
    {
        public int ImageID { get; set; }
        public string ImageURL { get; set; }
        public string ImageDescription { get; set; }
        public bool IsPrimary { get; set; }
        public int DisplayOrder { get; set; }
    }
}