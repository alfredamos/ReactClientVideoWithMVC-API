import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';


export const VideoThumbs = (props) => {
    const [videos, setVideos] = useState([]);

    const apiUrl = "https://localhost:5001/api/videos"

    //const deleteHandler = (id) => {
    //    console.log(id);
    //    props.history.replace({
    //        pathname: `/deleteVideo/${id}`
    //    });
    //}


    //const editHandler = (id) => {
    //    console.log(id);
    //    props.history.replace({
    //        pathname: `/editVideo/${id}`
    //    });
    //}


    //const createHandler = () => {
    //    props.history.replace({
    //        pathname: '/createVideo'
    //    });
    //}


    //const detailHandler = (id) => {
    //    console.log(id);
    //    props.history.replace({
    //        pathname: `/detailVideo/${id}`
    //    });
    //}


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setVideos(result.data);
        };
        GetData();
    }, [apiUrl]);




    return (
        <div className="border">
            <h1>Videos</h1>
            <p>Click any thumbnail to watch its video</p>
            <div className="videothumbs">
                {
                    videos.map(video => (
                        <Link key={video.videoID} to={`/detailVideo/${video.videoID}`}>
                            <img src={`http://i3.ytimg.com/vi/${video.youtubeVid}/mqdefault.jpg`} alt="{video.title}" title={`${video.title} : ${video.description}`}/>
                        </Link>
                 ))
                }
            </div>
        </div>
    );
}
