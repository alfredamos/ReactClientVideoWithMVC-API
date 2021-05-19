import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


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


export const DeleteVideo = (props) => {
    const [video, setVideo] = useState(initialValues);

    const apiUrl = `https://localhost:5001/api/videos/${props.match.params.id}`;

    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setVideo(result.data);

        };
        GetData();
    }, [apiUrl]);

    const deleteHandler = (event) => {
        event.preventDefault();
        if (window.confirm('Are you sure to delete this record?')) {
            axios.delete(apiUrl)
                .then(res => {
                    props.history.replace({
                        pathname: "/"
                    });

                })
        }
    }


    return (

        <div className="content-section" style={{ width: '50%' }}>
            <form onSubmit={deleteHandler}>
                <fieldset className="form-group">
                    <legend className="border-bottom m-2">Delete Video</legend>
                    <h2>Are you sure you want to delete this Category : "{video.title}"?</h2>
                </fieldset>
                <div className="form-group">
                    <button type="submit" className="btn btn-outline-danger" ><strong>Yes, Delete</strong></button>
                    <Link
                        className="btn btn-outline-secondary m-2"
                        to="/"
                    >
                        <strong>Cancel</strong>
                    </Link>
                </div>
            </form>
        </div>
    );

}