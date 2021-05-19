import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const VideoList = (props) => {
    const [videos, setVideos] = useState([]);

    const apiUrl = "https://localhost:5001/api/videos"

    const deleteHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/deleteVideo/${id}`
        });
    }


    const editHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/editVideo/${id}`
        });
    }


    const createHandler = () => {
        props.history.replace({
            pathname: '/createVideo'
        });
    }


    const detailHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/detailVideo/${id}`
        });
    }


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setVideos(result.data);
        };
        GetData();
    }, [apiUrl]);


  

    return (        
        <div className="border">
            <div className="card-header text-center">
                <h3>List of Videos</h3>
            </div>
            <div className="card-body">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>                           
                            <th>
                                Title
                            </th>
                            <th>
                                Author
                            </th>
                            <th>
                                Rating
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        videos.map(video => (
                            <tr key={video.videoID}>                               
                                <td style={{ textDecoration: video.isActive ? "none" : "line-through" }}>
                                    {video.title}
                                </td>
                                <td>
                                    {video.author}
                                </td>
                                <td>
                                    <div style={{ width: `calc(20% * ${video.stars_count}` }}></div>
                                    <img src="/images/stars.png" alt="Videos"
                                        title={video.stars_count} />
                                </td>
                                <td>
                                    <button onClick={() => editHandler(video.videoID)} className="btn btn-warning mr-2" style={{ fontWeight: "bold" }}>Edit</button>
                                    <button onClick={() => deleteHandler(video.videoID)} className="btn btn-danger mr-2" style={{ fontWeight: "bold" }}>Delete</button>
                                    <button onClick={() => detailHandler(video.videoID)} className="btn btn-primary" style={{ fontWeight: "bold" }}>Detail</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <div className="card-footer">
                <button onClick={createHandler} className="btn btn-primary btn-block"><strong>Create Category</strong></button>
            </div>
        </div>
        
    );
}
