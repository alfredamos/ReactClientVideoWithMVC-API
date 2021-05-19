using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactClientVideoWithMVC_API.Contracts;
using ReactClientVideoWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactClientVideoWithMVC_API.Controllers.Videos
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideosController : ControllerBase
    {
        private readonly IVideoRepository _videoRepository;
        private readonly IMapper _mapper;

        public VideosController(IVideoRepository videoRepository, IMapper mapper)
        {
            _videoRepository = videoRepository;
            _mapper = mapper;
        }

        // GET: api/Videos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Video>>> GetVideos()
        {
            try
            {
                return Ok(await _videoRepository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

        // GET: api/Videos/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Video>> GetVideo(int id)
        {
            try
            {
                var video = await _videoRepository.GetById(id);

                if (video == null)
                {
                    return NotFound($"Video with Id = {id} not found.");
                }

                return video;
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

        // PUT: api/Videos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Video>> PutVideo(int id, Video video)
        {
            try
            {
                if (id != video.VideoID)
                {
                    return BadRequest("Id mismatch.");
                }

                var videoToUpdate = await _videoRepository.GetById(id);

                if (videoToUpdate == null)
                {
                    return NotFound($"Video with Id = {id} not found.");
                }

                _mapper.Map(video, videoToUpdate);

                return await _videoRepository.UpdateEntity(videoToUpdate);

            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }


        }

        // POST: api/Videos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Video>> PostVideo(Video video)
        {
            try
            {
                if (video == null)
                {
                    return BadRequest("Invalid input");
                }

                var createdVideo = await _videoRepository.AddEntity(video);

                return CreatedAtAction(nameof(GetVideo), new { id = createdVideo.VideoID }, createdVideo);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating data.");
            }

        }

        // DELETE: api/Videos/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Video>> DeleteVideo(int id)
        {
            try
            {
                var video = await _videoRepository.GetById(id);

                if (video == null)
                {
                    return NotFound($"Video with Id = {id} not found.");
                }

                return await _videoRepository.DeleteEntity(id);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }

        }

        // GET: api/Videos
        [HttpGet("search/{searchKey}")]
        public async Task<ActionResult<IEnumerable<Video>>> Search(string searchKey)
        {
            try
            {
                return Ok(await _videoRepository.Search(searchKey));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

    }
}
