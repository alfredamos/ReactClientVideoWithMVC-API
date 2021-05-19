using AutoMapper;
using ReactClientVideoWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactClientVideoWithMVC_API.Mappings
{
    public class Mapp : Profile
    {
        public Mapp()
        {
            CreateMap<Category, Category>();
            CreateMap<Video, Video>();
        }
    }
}
