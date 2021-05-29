import React, { useState, useEffect } from 'react';
import { VideoForm } from '../Utilities/Forms/VideoForm'
import axios from 'axios';


const initValues = {
    title: '',
    author: '',
    description: '',
    youtubeVid: '',
    starsCount: '',
    categoryID: '',
    level: '',
    isActive: false
}

export const EditVideo = props => {
    const [categories, setCategories] = useState([]);
    const [video, setVideo] = useState(initValues);
    const [isLoading, setIsLoading] = useState(false);

    const videoApiUrl = `https://localhost:5001/api/videos/${props.match.params.id}`;
    const categoryApiUrl = `https://localhost:5001/api/categories`;


    useEffect(() => {
        const GetVideo = async () => {
            const result = await axios(videoApiUrl);
            setVideo(result.data); 
            setIsLoading(true);
        };
        GetVideo();
    }, [videoApiUrl]);


    useEffect(() => {
        const GetCategories = async () => {
            const result = await axios(categoryApiUrl);
            setCategories(result.data);            
        };
        GetCategories();
    }, [categoryApiUrl]);


    const videoEditHandler = (video) => {
        console.log("In editHandler", video);
        axios.put(videoApiUrl, video)
            .then(res => {
                props.history.replace('/')
            });
    }


    const backToListHandler = () => {
        props.history.replace({
            pathname: '/'
        });

    }


    return (
        <>
            {
                isLoading &&
                <VideoForm
                    categories={categories}
                    backToListHandler={backToListHandler}
                    heading={"Video Edit Form"}
                    upsertButton={"Save"}
                    videoInputChangeHandler={videoEditHandler}
                    initialValues={video}
                />
            }
        </>
    );

}
