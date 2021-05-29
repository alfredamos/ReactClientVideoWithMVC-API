import React, { useState, useEffect } from 'react'
import {ConfirmDelete} from '../Utilities/Helpers/ConfirmDelete'
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
    const [readyForRender, setReadyForRender] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const apiUrl = `https://localhost:5001/api/videos/${props.match.params.id}`;

    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setVideo(result.data);
            setReadyForRender(true);
            setIsDelete(false);

        };
        GetData();
    }, [apiUrl]);

    //const deleteHandler = (event) => {
    //    event.preventDefault();
    //    if (window.confirm('Are you sure to delete this record?')) {
    //        axios.delete(apiUrl)
    //            .then(res => {
    //                props.history.replace({
    //                    pathname: "/"
    //                });

    //            })
    //    }
    //}


    const deleteHandler = (deleteConfirmed) => {
        if (deleteConfirmed) {
            axios.delete(apiUrl)
        }
        props.history.replace({
            pathname: '/'
        });

    }


    const deleteClick = (event) => {
        event.preventDefault();
        setIsDelete(true);
    }


    return (
        <>
            <br />
            <br />
            {
                readyForRender &&
                <div className="content-section mt-5" style={{ width: '50%' }}>
                    <form >
                        <div className="border">
                            <div className="card-body">
                                <fieldset className="form-group">

                                    <legend className="border-bottom m-2">Delete Video</legend>
                                    <h2>Are you sure you want to delete : "{video.title}?</h2>


                                </fieldset>
                            </div>
                            <div className="form-group card-footer">
                                <button className="btn btn-outline-danger m-2" type="button" onClick={deleteClick}><strong>Yes, Delete</strong></button>
                                <Link
                                    className="btn btn-outline-secondary"
                                    to="/"
                                >
                                    <strong>Cancel</strong>
                                </Link>
                            </div>
                        </div>                        
                        {
                            isDelete && <ConfirmDelete
                                ConfirmationMessage={`Are you sure you want to delete ${video.title}?`}
                                ConfirmationTitle={"Delete Confirmation"}
                                deleteHandler={deleteHandler}
                            />
                        }
                    </form>
                </div>
            }
        </>
    );

}