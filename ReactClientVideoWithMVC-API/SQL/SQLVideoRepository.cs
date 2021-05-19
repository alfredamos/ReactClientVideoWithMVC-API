using Microsoft.EntityFrameworkCore;
using ReactClientVideoWithMVC_API.Contracts;
using ReactClientVideoWithMVC_API.Data;
using ReactClientVideoWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactClientVideoWithMVC_API.SQL
{
    public class SQLVideoRepository : IVideoRepository
    {
        private readonly ApplicationDbContext _context;

        public SQLVideoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Video> AddEntity(Video newEntity)
        {
            newEntity.LastUpdated = DateTime.Now;

            var video = await _context.Videos.AddAsync(newEntity);
            await _context.SaveChangesAsync();

            return video.Entity;
        }

        public async Task<Video> DeleteEntity(int id)
        {
            var videoToDelete = await _context.Videos.FindAsync(id);
            if (videoToDelete != null)
            {
                _context.Videos.Remove(videoToDelete);
                await _context.SaveChangesAsync();
            }

            return videoToDelete;
        }

        public async Task<IEnumerable<Video>> GetAll()
        {
            return await _context.Videos.ToListAsync();
        }

        public async Task<Video> GetById(int id)
        {
            return await _context.Videos.FindAsync(id);
        }

        public async Task<IEnumerable<Video>> Search(string searchKey)
        {
            Enum.TryParse(searchKey, out SkillLevel SearchSkillLevel);

            IQueryable<Video> query = _context.Videos;

            if (string.IsNullOrWhiteSpace(searchKey))
            {
                return await query.ToListAsync();
            }

            return await query.Where(c => c.Author.Contains(searchKey) ||
                              c.Description.Contains(searchKey) ||
                              c.Title.Contains(searchKey) || c.YoutubeVid.Contains(searchKey) ||
                              c.Category.CategoryName.Contains(searchKey) ||
                              c.Level.Equals(SearchSkillLevel)).ToListAsync();
        }

        public async Task<Video> UpdateEntity(Video updatedEntity)
        {
            updatedEntity.LastUpdated = DateTime.Now;

            var video = _context.Videos.Attach(updatedEntity);
            video.State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return video.Entity;
        }
    }
}
