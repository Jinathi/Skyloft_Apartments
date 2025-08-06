// Controllers/InquiriesController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkyloftApartments.Data;
using SkyloftApartments.Models;

namespace SkyloftApartments.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InquiriesController : ControllerBase
    {
        private readonly SkyloftDbContext _context;
        
        public InquiriesController(SkyloftDbContext context)
        {
            _context = context;
        }
        
        // POST: api/inquiries - Submit new inquiry
        [HttpPost]
        public async Task<ActionResult<Inquiry>> CreateInquiry([FromBody] CreateInquiryDto inquiryDto)
        {
            // Validate unit exists if specified
            if (inquiryDto.UnitID.HasValue)
            {
                var unitExists = await _context.Units.AnyAsync(u => u.UnitID == inquiryDto.UnitID);
                if (!unitExists)
                    return BadRequest("Invalid unit ID");
            }
            
            var inquiry = new Inquiry
            {
                UnitID = inquiryDto.UnitID,
                FullName = inquiryDto.FullName,
                Email = inquiryDto.Email,
                Phone = inquiryDto.Phone,
                Message = inquiryDto.Message,
                PreferredMoveInDate = inquiryDto.PreferredMoveInDate,
                Status = "New"
            };
            
            _context.Inquiries.Add(inquiry);
            await _context.SaveChangesAsync();
            
            return CreatedAtAction(nameof(GetInquiry), new { id = inquiry.InquiryID }, inquiry);
        }
        
        // GET: api/inquiries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Inquiry>> GetInquiry(int id)
        {
            var inquiry = await _context.Inquiries
                .Include(i => i.Unit)
                .FirstOrDefaultAsync(i => i.InquiryID == id);
            
            if (inquiry == null)
                return NotFound();
            
            return Ok(inquiry);
        }
    }
}