import React, { useState, useEffect } from 'react';
import { VideoForm } from '../Utilities/Forms/VideoForm'
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

export const CreateVideo = props => {
    const [categories, setCategories] = useState([]);
    const [video, setVideo] = useState(initialValues);

    const videoApiUrl = "https://localhost:5001/api/videos"
    const categoryApiUrl = `https://localhost:5001/api/categories`;


    useEffect(() => {
        const GetCategories = async () => {
            const result = await axios(categoryApiUrl);
            setCategories(result.data);
        };
        GetCategories();
    }, [categoryApiUrl]);


    const formSubmitHandler = (event) => {
        event.preventDefault();
        axios.post(videoApiUrl, video)
            .then(res => {
                props.history.replace('/')
            });
    }

    const inputChangeHandler = (event) => {
        event.persist();
        const { name, value } = event.target;
        setVideo({ ...video, [name]: value })
    }


    const backToListHandler = () => {
        props.history.replace({
            pathname: '/'
        });

    }


    return (
        <VideoForm
            categories={categories}
            video={video}
            backToListHandler={backToListHandler}
            formSubmitHandler={formSubmitHandler}
            inputChangeHandler={inputChangeHandler}
            heading={"Video Form"}
            upsertButton={"Create"}
        />
    );
}
