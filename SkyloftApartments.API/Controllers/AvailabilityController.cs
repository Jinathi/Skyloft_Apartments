// Controllers/AvailabilityController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class AvailabilityController : ControllerBase
{
    private readonly AppDbContext _context;

    public AvailabilityController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/availability?startDate=2024-01-01&endDate=2024-01-31
    [HttpGet]
    public async Task<ActionResult<object>> GetAvailability([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
    {
        var apartments = await _context.Apartments
            .Where(a => a.IsActive)
            .Include(a => a.Bookings)
            .Include(a => a.BlockedDates)
            .ToListAsync();

        var result = apartments.Select(apartment => new
        {
            ApartmentID = apartment.ApartmentID,
            Name = apartment.Name,
            BasePrice = apartment.BasePrice,
            IsAvailable = IsApartmentAvailable(apartment, startDate, endDate),
            BookedDates = GetBookedDates(apartment, startDate, endDate)
        });

        return Ok(result);
    }

    private bool IsApartmentAvailable(Apartment apartment, DateTime startDate, DateTime endDate)
    {
        // Check for overlapping bookings
        var hasOverlappingBooking = apartment.Bookings
            .Any(b => b.Status != "Cancelled" && 
                     startDate < b.CheckOutDate && 
                     endDate > b.CheckInDate);

        // Check for blocked dates
        var hasBlockedDates = apartment.BlockedDates
            .Any(b => startDate < b.EndDate && endDate > b.StartDate);

        return !hasOverlappingBooking && !hasBlockedDates;
    }

    private List<DateTime> GetBookedDates(Apartment apartment, DateTime startDate, DateTime endDate)
    {
        var bookedDates = new List<DateTime>();
        
        var bookings = apartment.Bookings
            .Where(b => b.Status != "Cancelled" && 
                       b.CheckInDate <= endDate && 
                       b.CheckOutDate >= startDate);

        foreach (var booking in bookings)
        {
            for (var date = booking.CheckInDate; date < booking.CheckOutDate; date = date.AddDays(1))
            {
                if (date >= startDate && date <= endDate)
                {
                    bookedDates.Add(date);
                }
            }
        }

        return bookedDates;
    }
}