import React from 'react';
import { CategoryForm } from '../Utilities/Forms/CategoryForm'
import axios from 'axios'


const initialCategory = { categoryName: '' };


export const CreateCategory = (props) => {    
    const apiURL = "https://localhost:5001/api/categories"

    const createCategoryHandler = (categoryInput) => {        
        axios.post(apiURL, categoryInput)
            .then(res => {
                props.history.push('/categoryList')
            });
    }

   
    const backToListHandler = () => {
        props.history.push({
            pathname: '/categoryList'
        });

    }


    return (
        <CategoryForm            
            backToListHandler={backToListHandler}
            heading={"Category Create Form"}
            upsertButton={"Create"}
            onChangeCategory={createCategoryHandler}
            initialCategory={initialCategory}
        />
    );
}