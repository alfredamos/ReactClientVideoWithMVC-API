﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using ReactClientVideoWithMVC_API.Contracts;
using ReactClientVideoWithMVC_API.Models;

namespace ReactClientVideoWithMVC_API.Controllers.Categories
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {        
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoriesController(ICategoryRepository categoryRepository, IMapper mapper)
        {            
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            try
            {
                return Ok(await _categoryRepository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

        // GET: api/Categories/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            try
            {
                var category = await _categoryRepository.GetById(id);

                if (category == null)
                {
                    return NotFound($"Category with Id = {id} not found.");
                }

                return Ok(category);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
            
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Category>> PutCategory(int id, Category category)
        {
            try
            {
                if (id != category.CategoryID)
                {
                    return BadRequest("Id mismatch");
                }

                var categoryToUpdate = await _categoryRepository.GetById(id);

                if (categoryToUpdate == null)
                {
                    return NotFound($"Category with Id = {id} not found.");
                }

                _mapper.Map(category, categoryToUpdate);

                return Ok(await _categoryRepository.UpdateEntity(categoryToUpdate));

            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }
            
            
        }

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            try
            {
                if (category == null)
                {
                    return BadRequest("Invalid input");
                }

                var createdCategory = await _categoryRepository.AddEntity(category);

                return CreatedAtAction("GetCategory", new { id = createdCategory.CategoryID }, createdCategory);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating data.");
            }
            
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Category>> DeleteCategory(int id)
        {
            try
            {
                var category = await _categoryRepository.GetById(id);

                if (category == null)
                {
                    return NotFound($"Category with Id = {id} not found.");
                }

                return Ok(await _categoryRepository.DeleteEntity(id));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }
           
        }

        // GET: api/Categories
        [HttpGet("search/{searchKey}")]
        public async Task<ActionResult<IEnumerable<Category>>> Search(string searchKey)
        {
            try
            {
                return Ok(await _categoryRepository.Search(searchKey));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

    }
}
