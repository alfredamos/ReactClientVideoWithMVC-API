import React, { useState, useEffect } from 'react'
import { CategoryForm } from '../Utilities/Forms/CategoryForm'
import axios from 'axios'


const initValue = { categoryID: '', categoryName: '' };

export const EditCategory = (props) => {
    const [category, setCategory] = useState(initValue);
    const [isLoading, setIsLoading] = useState(false);

    const apiUrl = `https://localhost:5001/api/categories/${props.match.params.id}`;

    useEffect(() => {
        const GetCategory = async () => {
            const result = await axios(apiUrl);
            setCategory(result.data);
            setIsLoading(true);
        };
        GetCategory();
    }, [apiUrl]);


    const editCategoryHandler = (categoryInput) => {
        axios.put(apiUrl, categoryInput)
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
        <>
            {
                isLoading &&
                <CategoryForm
                    backToListHandler={backToListHandler}
                    heading={"Category Edit Form"}
                    upsertButton={"Save"}
                    onChangeCategory={editCategoryHandler}
                    initialCategory={category}
                />
            }
        </>
    );
}