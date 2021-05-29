import React, { useState, useEffect } from 'react';
import { VideoForm } from '../Utilities/Forms/VideoForm'
import axios from 'axios';


const initialValues = {
    title: '',
    author: '',
    description: '',
    youtubeVid: '',
    starsCount: '',
    categoryID: '',
    level: '',
    isActive: false
}

export const CreateVideo = props => {
    const [categories, setCategories] = useState([]);    

    const videoApiUrl = "https://localhost:5001/api/videos"
    const categoryApiUrl = `https://localhost:5001/api/categories`;


    useEffect(() => {
        const GetCategories = async () => {
            const result = await axios(categoryApiUrl);
            setCategories(result.data);
        };
        GetCategories();
    }, [categoryApiUrl]);


    const videoCreateHandler = (video) => {        
        console.log(video);
        axios.post(videoApiUrl, video)
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
        <VideoForm
            categories={categories}
            backToListHandler={backToListHandler}
            heading={"Video Create Form"}
            upsertButton={"Create"}
            videoInputChangeHandler={videoCreateHandler}
            initialValues={initialValues}
        />
    );
}
