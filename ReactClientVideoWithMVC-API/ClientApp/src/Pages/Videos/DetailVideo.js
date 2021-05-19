import React, { useState, useEffect } from 'react';
import axios from 'axios';


const initialValues = {
    title: '',
    author: '',
    description: '',
    youtubeVid: '',
    starsCount: 0,
    categoryID: 0,
    level: 0,
    isActive: false
}


export const DetailVideo = (props) => {
    const [video, setVideo] = useState(initialValues);

    const apiUrl = `https://localhost:5001/api/videos/${props.match.params.id}`;


    useEffect(() => {
        const GetVideo = async () => {
            const result = await axios(apiUrl);
            setVideo(result.data);
        };
        GetVideo();
    }, [apiUrl]);


    //const backToListHandler = () => {
    //    props.history.replace({
    //        pathname: '/videoList'
    //    });

    //}

    //const deleteHandler = async (id) => {
    //    props.history.push({
    //        pathname: `/deleteVideo/${id}`
    //    });
    //}

    return (

        <div className="border" style={{ width: '50%' }}>
            <h1>{ video.title}</h1>
            {/*<!-- Standard YouTube embed, with width= and height= removed. -->*/}
            <iframe title="mytitle" src={`https://www.youtube.com/embed/${video.youtube_vid}`} frameBorder="0" allow="autoplay; encrypted-media"
                allowFullScreen></iframe>

        </div >

    );

}
