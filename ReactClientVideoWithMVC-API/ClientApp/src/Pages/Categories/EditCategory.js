import React, { useState, useEffect } from 'react'
import { CategoryForm } from '../Utilities/Forms/CategoryForm'
import axios from 'axios'

export const EditCategory = (props) => {
    const [category, setCategory] = useState({ categoryID: 0, categoryName: '' });

    const apiUrl = `https://localhost:5001/api/categories/${props.match.params.id}`;

    useEffect(() => {
        const GetCategory = async () => {
            const result = await axios(apiUrl);
            setCategory(result.data);
            
        };
        GetCategory();
    }, [apiUrl]);  

    const formSubmitHandler = (event) => {
        event.preventDefault();               
        axios.put(apiUrl, category)
            .then(res => {
                props.history.push('/categoryList')
            });
    }

    const inputChangeHandler = (event) => {    
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
            heading={"Category Edit Form"}
            upsertButton={"Save"}
        />
    );
}