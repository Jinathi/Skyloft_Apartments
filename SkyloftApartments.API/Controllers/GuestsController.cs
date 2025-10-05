// Controllers/GuestsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class GuestsController : ControllerBase
{
    private readonly AppDbContext _context;

    public GuestsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/guests
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Guest>>> GetGuests()
    {
        return await _context.Guests.ToListAsync();
    }

    // GET: api/guests/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Guest>> GetGuest(int id)
    {
        var guest = await _context.Guests.FindAsync(id);

        if (guest == null)
        {
            return NotFound();
        }

        return guest;
    }

    // POST: api/guests
    [HttpPost]
    public async Task<ActionResult<Guest>> CreateGuest(Guest guest)
    {
        _context.Guests.Add(guest);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetGuest), new { id = guest.GuestID }, guest);
    }

    // PUT: api/guests/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateGuest(int id, Guest guest)
    {
        if (id != guest.GuestID)
        {
            return BadRequest();
        }

        _context.Entry(guest).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!GuestExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    private bool GuestExists(int id)
    {
        return _context.Guests.Any(e => e.GuestID == id);
    }
}