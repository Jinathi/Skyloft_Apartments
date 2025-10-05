// Controllers/AmenitiesController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class AmenitiesController : ControllerBase
{
    private readonly AppDbContext _context;

    public AmenitiesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/amenities
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Amenity>>> GetAmenities()
    {
        return await _context.Amenities.ToListAsync();
    }
}