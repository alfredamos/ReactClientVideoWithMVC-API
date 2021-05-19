using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactClientVideoWithMVC_API.Models
{
    public class Video
    {
        public int VideoID { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string YoutubeVid { get; set; }
        public double StarsCount { get; set; }

        [ForeignKey("Category")]
        public int CategoryID { get; set; }
        public Category Category { get; set; }
        public SkillLevel Level { get; set; }
        public bool IsActive { get; set; }
        public DateTime DatePosted { get; set; } = DateTime.Now;
        public DateTime LastUpdated { get; set; }
    }
}
