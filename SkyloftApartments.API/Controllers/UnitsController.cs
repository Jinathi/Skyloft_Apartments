// Controllers/UnitsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkyloftApartments.Data;
using SkyloftApartments.DTOs;
using SkyloftApartments.Models;

namespace SkyloftApartments.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UnitsController : ControllerBase
    {
        private readonly SkyloftDbContext _context;
        
        public UnitsController(SkyloftDbContext context)
        {
            _context = context;
        }
        
        // GET: api/units - Get all available units
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UnitListDto>>> GetUnits(
            [FromQuery] string? unitType = null,
            [FromQuery] int? minBedrooms = null,
            [FromQuery] int? maxBedrooms = null,
            [FromQuery] decimal? maxRent = null,
            [FromQuery] bool? availableOnly = true)
        {
            var query = _context.Units
                .Include(u => u.Images)
                .Include(u => u.Property)
                .AsQueryable();
            
            if (availableOnly == true)
                query = query.Where(u => u.IsAvailable);
            
            if (!string.IsNullOrEmpty(unitType))
                query = query.Where(u => u.UnitType == unitType);
            
            if (minBedrooms.HasValue)
                query = query.Where(u => u.Bedrooms >= minBedrooms);
            
            if (maxBedrooms.HasValue)
                query = query.Where(u => u.Bedrooms <= maxBedrooms);
            
            if (maxRent.HasValue)
                query = query.Where(u => u.MonthlyRent <= maxRent);
            
            var units = await query
                .OrderBy(u => u.MonthlyRent)
                .Select(u => new UnitListDto
                {
                    UnitID = u.UnitID,
                    UnitNumber = u.UnitNumber,
                    UnitType = u.UnitType ?? "Apartment",
                    Bedrooms = u.Bedrooms,
                    Bathrooms = u.Bathrooms,
                    SquareFeet = u.SquareFeet,
                    MonthlyRent = u.MonthlyRent,
                    IsAvailable = u.IsAvailable,
                    Description = u.Description ?? "",
                    Amenities = string.IsNullOrEmpty(u.Amenities) ? new List<string>() : u.Amenities.Split(',').ToList(),
                    HasBalcony = u.HasBalcony,
                    HasParking = u.HasParking,
                    IsFurnished = u.IsFurnished,
                    FloorNumber = u.FloorNumber ?? 1,
                    PrimaryImageUrl = u.Images.FirstOrDefault(i => i.IsPrimary) != null 
                        ? u.Images.FirstOrDefault(i => i.IsPrimary)!.ImageURL 
                        : "/images/default-apartment.jpg"
                })
                .ToListAsync();
            
            return Ok(units);
        }
        
        // GET: api/units/5 - Get specific unit details
        [HttpGet("{id}")]
        public async Task<ActionResult<UnitDetailDto>> GetUnit(int id)
        {
            var unit = await _context.Units
                .Include(u => u.Images.OrderBy(i => i.DisplayOrder))
                .Include(u => u.Property)
                .FirstOrDefaultAsync(u => u.UnitID == id);
            
            if (unit == null)
                return NotFound($"Unit with ID {id} not found");
            
            var unitDetail = new UnitDetailDto
            {
                UnitID = unit.UnitID,
                UnitNumber = unit.UnitNumber,
                UnitType = unit.UnitType ?? "Apartment",
                Bedrooms = unit.Bedrooms,
                Bathrooms = unit.Bathrooms,
                SquareFeet = unit.SquareFeet,
                MonthlyRent = unit.MonthlyRent,
                SecurityDeposit = unit.SecurityDeposit,
                Description = unit.Description ?? "",
                Amenities = string.IsNullOrEmpty(unit.Amenities) ? new List<string>() : unit.Amenities.Split(',').ToList(),
                HasBalcony = unit.HasBalcony,
                HasParking = unit.HasParking,
                IsFurnished = unit.IsFurnished,
                FloorNumber = unit.FloorNumber ?? 1,
                PropertyName = unit.Property.PropertyName,
                PropertyAddress = unit.Property.Address,
                ContactPhone = unit.Property.ContactPhone ?? "",
                ContactEmail = unit.Property.ContactEmail ?? "",
                Images = unit.Images.Select(i => new UnitImageDto
                {
                    ImageID = i.ImageID,
                    ImageURL = i.ImageURL,
                    ImageDescription = i.ImageDescription ?? "",
                    IsPrimary = i.IsPrimary,
                    DisplayOrder = i.DisplayOrder
                }).ToList()
            };
            
            return Ok(unitDetail);
        }
        
        // GET: api/units/types - Get available unit types
        [HttpGet("types")]
        public async Task<ActionResult<IEnumerable<string>>> GetUnitTypes()
        {
            var types = await _context.Units
                .Where(u => u.IsAvailable && !string.IsNullOrEmpty(u.UnitType))
                .Select(u => u.UnitType!)
                .Distinct()
                .OrderBy(t => t)
                .ToListAsync();
            
            return Ok(types);
        }
    }
}