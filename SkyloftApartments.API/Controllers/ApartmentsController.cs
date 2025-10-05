// Controllers/ApartmentsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ApartmentsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ApartmentsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/apartments
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Apartment>>> GetApartments()
    {
        // This becomes a SQL query: SELECT * FROM Apartments WHERE IsActive = 1
        return await _context.Apartments
            .Where(a => a.IsActive)
            .Include(a => a.ApartmentAmenities)
                .ThenInclude(aa => aa.Amenity)
            .ToListAsync();
    }

    // GET: api/apartments/1
    [HttpGet("{id}")]
    public async Task<ActionResult<Apartment>> GetApartment(int id)
    {
        var apartment = await _context.Apartments
            .Include(a => a.ApartmentAmenities)
                .ThenInclude(aa => aa.Amenity)
            .FirstOrDefaultAsync(a => a.ApartmentID == id);

        if (apartment == null)
        {
            return NotFound();
        }

        return apartment;
    }
}