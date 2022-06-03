import React, {useState} from 'react'
import APIService from '../components/APIService';

function Form(props) {

    const[title, setTitle] = useState(props.post.title)
    const[body, setBody] = useState(props.post.body)
    
    const updatePost = () => {
        APIService.UpdatePost(props.post.id, {title, body})
        .then(resp => props.updatedData(resp))
        .catch(error => console.log(error))
    }

    return (
        <div>
            {props.post ? (

                <div className="mb-3">

                    <label htmlFor = "title" className = "form-label">Title</label>
                    <input type='text' className="form-control" placeholder="Please Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />

                    <label htmlFor = "body" className = "form-label">Description</label>
                    <textarea
                    className="form-control"
                    row = "5"
                    placeholder="Please Enter Description"
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                    />
                    <button
                    className="btn btn-success mt-3"
                    onClick={updatePost}>Update</button>

                </div>

            ):null}




        </div>
    )
}

export default Form