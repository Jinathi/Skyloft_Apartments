// Controllers/ContactController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContactController(AppDbContext context)
    {
        _context = context;
    }

    // POST: api/contact
    [HttpPost]
    public async Task<ActionResult<ContactSubmission>> SubmitContact(ContactSubmission submission)
    {
        _context.ContactSubmissions.Add(submission);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSubmission), new { id = submission.SubmissionID }, submission);
    }

    // GET: api/contact/5 (for admin purposes)
    [HttpGet("{id}")]
    public async Task<ActionResult<ContactSubmission>> GetSubmission(int id)
    {
        var submission = await _context.ContactSubmissions.FindAsync(id);

        if (submission == null)
        {
            return NotFound();
        }

        return submission;
    }

    // GET: api/contact (for admin purposes)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ContactSubmission>>> GetSubmissions()
    {
        return await _context.ContactSubmissions.OrderByDescending(c => c.CreatedDate).ToListAsync();
    }
}