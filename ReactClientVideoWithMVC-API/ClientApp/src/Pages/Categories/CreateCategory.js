import React, { useState } from 'react'
import { CategoryForm } from '../Utilities/Forms/CategoryForm'
import axios from 'axios'

export const CreateCategory = (props) => {
    const [category, setCategory] = useState({ categoryName: '' });

    const apiURL = "https://localhost:5001/api/categories"

    const formSubmitHandler = (event) => {        
        event.preventDefault();
        axios.post(apiURL, category)
            .then(res => {
                props.history.push('/categoryList')
            });
    }

    const inputChangeHandler = (event) => {
        event.persist();        
        const { name, value } = event.target;       
        setCategory({ ...category, [name]: value })
    }


    const backToListHandler = () => {
        props.history.push({
            pathname: '/categoryList'
        });

    }


    return (
        <CategoryForm
            category={category}
            backToListHandler={backToListHandler}
            formSubmitHandler={formSubmitHandler}
            inputChangeHandler={inputChangeHandler}
            heading={"Category Form"}
            upsertButton={"Create"}
        />
    );
}