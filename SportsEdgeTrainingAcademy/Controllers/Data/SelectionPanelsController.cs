using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsEdgeTrainingAcademy.Models;

namespace SportsEdgeTrainingAcademy.Controllers.Data
{
    [Route("api/[controller]")]
    [ApiController]
    public class SelectionPanelsController : ControllerBase
    {      
        private readonly SportsEdgeDbContext _context;

        public SelectionPanelsController(SportsEdgeDbContext context)
        {
            _context = context;
        }

        // GET: api/SelectionPanels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SelectionPanel>>> GetSelectionPanels()
        {
            if (_context.SelectionPanels == null)
            {
                return NotFound();
            }
            return await _context.SelectionPanels.ToListAsync();
        }
        // GET: api/SelectionPanels
        [HttpGet("Events/Include")]
        public async Task<ActionResult<IEnumerable<SelectionPanel>>> GetSelectionPanelsWithEvents()
        {
            if (_context.SelectionPanels == null)
            {
                return NotFound();
            }
            return await _context.SelectionPanels.Include(x => x.Events).ToListAsync();
        }

        [HttpGet("Coaches/Include")]
        public async Task<ActionResult<IEnumerable<SelectionPanel>>> GetSelectionPanelsWithCoaches()
        {
            if (_context.SelectionPanels == null)
            {
                return NotFound();
            }
            return await _context.SelectionPanels.Include(x => x.Coach).ToListAsync();
        }

        // GET: api/SelectionPanels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SelectionPanel>> GetSelectionPanel(int id)
        {
            if (_context.SelectionPanels == null)
            {
                return NotFound();
            }
            var selectionPanel = await _context.SelectionPanels.FindAsync(id);

            if (selectionPanel == null)
            {
                return NotFound();
            }

            return selectionPanel;
        }
        // GET: api/SelectionPanels/5
        [HttpGet("{id}/Event")]
        public async Task<ActionResult<SelectionPanel>> GetSelectionPanelWithEvent(int id)
        {
            if (_context.SelectionPanels == null)
            {
                return NotFound();
            }
            var selectionPanel = await _context.SelectionPanels.Include(x => x.Events).FirstOrDefaultAsync(x => x.SelectionPanelId == id);

            if (selectionPanel == null)
            {
                return NotFound();
            }

            return selectionPanel;
        }
        [HttpGet("{id}/Coach")]
        public async Task<ActionResult<SelectionPanel>> GetSelectionPanelWithCoach(int id)
        {
            if (_context.SelectionPanels == null)
            {
                return NotFound();
            }
            var selectionPanel = await _context.SelectionPanels.Include(x => x.Coach).FirstOrDefaultAsync(x => x.SelectionPanelId == id);

            if (selectionPanel == null)
            {
                return NotFound();
            }

            return selectionPanel;
        }
        // PUT: api/SelectionPanels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSelectionPanel(int id, SelectionPanel selectionPanel)
        {
            if (id != selectionPanel.SelectionPanelId)
            {
                return BadRequest();
            }

            _context.Entry(selectionPanel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SelectionPanelExists(id))
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

        // POST: api/SelectionPanels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SelectionPanel>> PostSelectionPanel(SelectionPanel selectionPanel)
        {
            if (_context.SelectionPanels == null)
            {
                return Problem("Entity set 'SportsEdgeDbContext.SelectionPanels'  is null.");
            }
            _context.SelectionPanels.Add(selectionPanel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSelectionPanel", new { id = selectionPanel.SelectionPanelId }, selectionPanel);
        }

        // DELETE: api/SelectionPanels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSelectionPanel(int id)
        {
            if (_context.SelectionPanels == null)
            {
                return NotFound();
            }
            var selectionPanel = await _context.SelectionPanels.FindAsync(id);
            if (selectionPanel == null)
            {
                return NotFound();
            }

            _context.SelectionPanels.Remove(selectionPanel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SelectionPanelExists(int id)
        {
            return (_context.SelectionPanels?.Any(e => e.SelectionPanelId == id)).GetValueOrDefault();
        }
    }
}

