// Controllers/BookingsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly AppDbContext _context;

    public BookingsController(AppDbContext context)
    {
        _context = context;
    }

    // ADD THIS MISSING METHOD:
    // GET: api/bookings/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Booking>> GetBooking(int id)
    {
        var booking = await _context.Bookings
            .Include(b => b.Apartment)
            .Include(b => b.Guest)
            .FirstOrDefaultAsync(b => b.BookingID == id);

        if (booking == null)
        {
            return NotFound();
        }

        return booking;
    }

    // POST: api/bookings
    [HttpPost]
    public async Task<ActionResult<Booking>> CreateBooking(Booking booking)
    {
        // Generate unique booking reference
        booking.BookingReference = GenerateBookingReference();
        
        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();

        // This line was causing the error - now it will work
        return CreatedAtAction(nameof(GetBooking), new { id = booking.BookingID }, booking);
    }

    // GET: api/bookings/availability?apartmentId=1&checkIn=2024-01-15&checkOut=2024-01-20
    [HttpGet("availability")]
    public async Task<ActionResult<bool>> CheckAvailability(int apartmentId, DateTime checkIn, DateTime checkOut)
    {
        var isAvailable = !await _context.Bookings
            .AnyAsync(b => b.ApartmentID == apartmentId 
                        && b.Status != "Cancelled"
                        && checkIn < b.CheckOutDate 
                        && checkOut > b.CheckInDate);

        return isAvailable;
    }

    // Optional: Add more methods for completeness
    // GET: api/bookings
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
    {
        return await _context.Bookings
            .Include(b => b.Apartment)
            .Include(b => b.Guest)
            .ToListAsync();
    }

    // PUT: api/bookings/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBooking(int id, Booking booking)
    {
        if (id != booking.BookingID)
        {
            return BadRequest();
        }

        _context.Entry(booking).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!BookingExists(id))
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

    // DELETE: api/bookings/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBooking(int id)
    {
        var booking = await _context.Bookings.FindAsync(id);
        if (booking == null)
        {
            return NotFound();
        }

        _context.Bookings.Remove(booking);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool BookingExists(int id)
    {
        return _context.Bookings.Any(e => e.BookingID == id);
    }

    private string GenerateBookingReference()
    {
        return "SKY" + DateTime.Now.ToString("yyyyMMddHHmmss");
    }
}