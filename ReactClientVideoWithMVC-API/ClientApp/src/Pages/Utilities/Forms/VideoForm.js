import React from 'react';


export const VideoForm = (props) => {
    const {categories, video, backToListHandler, formSubmitHandler, heading, inputChangeHandler, upsertButton } = props;

    return (
        <div className="border">
            <div className="card-header text-center">
                <h3>{heading}</h3>
            </div>
            <div className="card-body">
                <form onSubmit={formSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="title" className="form-control-label">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={video.title}
                            placeholder="Title"
                            className="form-control"
                            onChange={inputChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author" className="form-control-label">Author</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={video.author}
                            placeholder="Author"
                            className="form-control"
                            onChange={inputChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="form-control-label">Description</label>
                        <textarea
                            type="text"
                            id="description"
                            name="description"
                            value={video.description}
                            placeholder="Description"
                            className="form-control"
                            onChange={inputChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="youtubeVid" className="form-control-label">Youtube ID</label>
                        <input
                            type="text"
                            id="youtubeVid"
                            name="youtubeVid"
                            value={video.youtubeVid}
                            placeholder="Youtube ID"
                            className="form-control"
                            onChange={inputChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="starsCount" className="form-control-label">Stars Count</label>
                        <input
                            type="number"
                            id="starsCount"
                            name="starsCount"
                            value={video.starsCount}
                            placeholder="Stars Count"
                            className="form-control"
                            min="1"
                            max="5"
                            onChange={inputChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Category :
                        </label>
                        <select
                            id="categoryID"
                            name="categoryID"
                            className="form-control"
                            onChange={inputChangeHandler}
                        >
                            <option>Select Category</option>
                            {
                                categories.map(category => (

                                    <option
                                        key={category.categoryID}
                                        value={category.categoryID}

                                    >
                                        {category.categoryName}
                                    </option>

                                ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Skill Level :
                        </label>
                        <select
                            id="level"
                            name="level"
                            className="form-control"
                            onChange={inputChangeHandler}
                        >
                            <option>Select Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advance">Advance</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="isActive" className="form-control-label">IsActive</label>
                        <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            value={video.isActive}                           
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