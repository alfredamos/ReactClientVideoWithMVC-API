import React, { useState } from 'react';


export const CategoryForm = (props) => {
    const { backToListHandler, heading, upsertButton, onChangeCategory, initialCategory } = props;

    const [category, setCategory] = useState(initialCategory);


    const formSubmitHandler = (event) => {
        event.preventDefault();
        onChangeCategory(category);
    }

    const inputChangeHandler = (event) => {
        event.persist();
        const { name, value } = event.target;
        setCategory({ ...category, [name]: value })

    }

    return (
        <div className="border">
            <div className="card-header text-center">
                <h3>{heading}</h3>
            </div>
            <div className="card-body">
                <form onSubmit={formSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="categoryName" className="form-control-label"> Category Name</label>
                        <input 
                            type="text"
                            id="categoryName"
                            name="categoryName"
                            value={category.categoryName}
                            placeholder="category name"
                            className="form-control"
                            onChange={inputChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-secondary btn-block"><strong>{upsertButton}</strong></button>
                    </div>
                </form>
            </div>
            <div className="card-footer">
                <button onClick={backToListHandler} className="btn btn-primary btn-block"><strong>Back To Category List</strong></button>
            </div>
        </div>
    );
}