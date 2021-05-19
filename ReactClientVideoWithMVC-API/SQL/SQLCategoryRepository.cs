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
    public class SQLCategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public SQLCategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Category> AddEntity(Category newEntity)
        {
            var category = await _context.Categories.AddAsync(newEntity);
            await _context.SaveChangesAsync();

            return category.Entity;
        }

        public async Task<Category> DeleteEntity(int id)
        {
            var categoryToDelete = await _context.Categories.FindAsync(id);
            if (categoryToDelete != null)
            {
                _context.Categories.Remove(categoryToDelete);
                await _context.SaveChangesAsync();
            }

            return categoryToDelete;
        }

        public async Task<IEnumerable<Category>> GetAll()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category> GetById(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task<IEnumerable<Category>> Search(string searchKey)
        {
            IQueryable<Category> query = _context.Categories;

            if (string.IsNullOrWhiteSpace(searchKey))
            {
                return await query.ToListAsync();
            }

            return await query.Where(c => c.CategoryName.Contains(searchKey)).ToListAsync();
        }

        public async Task<Category> UpdateEntity(Category updatedEntity)
        {
            var category = _context.Categories.Attach(updatedEntity);
            category.State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return category.Entity;
        }
    }
}
