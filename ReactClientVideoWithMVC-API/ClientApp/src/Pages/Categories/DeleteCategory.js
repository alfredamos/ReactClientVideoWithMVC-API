import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export const DeleteCategory = (props) => {
    const [category, setCategory] = useState({ categoryID: '', categoryName: '' });

    const apiUrl = `https://localhost:5001/api/categories/${props.match.params.id}`;

    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setCategory(result.data);

        };
        GetData();
    }, [apiUrl]);

    const deleteHandler = (event) => {
        event.preventDefault();        
        if (window.confirm('Are you sure to delete this record?')) {
            axios.delete(apiUrl)
                .then(res => {
                    props.history.replace({
                        pathname: "/categoryList"
                    });

                })
        }
    }


    return (

        <div className="content-section" style={{ width: '50%' }}>
            <form onSubmit={deleteHandler}>
                <fieldset className="form-group">
                    <legend className="border-bottom m-2">Delete Category</legend>
                    <h2>Are you sure you want to delete this Category : "{category.categoryName}"?</h2>
                </fieldset>
                <div className="form-group">
                    <button type="submit" className="btn btn-outline-danger" ><strong>Yes, Delete</strong></button>
                    <Link
                        className="btn btn-outline-secondary m-2"
                        to="/categoryList"
                    >
                        <strong>Cancel</strong>
                    </Link>
                </div>
            </form>
        </div>
    );

}