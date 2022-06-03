import React from 'react'

function PostList(props) {

    const editPost = (post) => {
        props.editPost(post)
    }

    return (
        <div>
            {props.posts && props.posts.map(post => {
                return (
                    <div key = {post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <p>{post.date}</p>

                        <div className='row'>
                            <div className='col-md-1'>
                                <button onClick={() => editPost(post)} className="btn btn-primary">Update</button>
                            </div>

                            <div className='col'>
                                <button className="btn btn-danger">Delete</button>
                            </div>

                        </div>

                        <hr/>

                    </div>
                )
            })}
        </div>
    )
}

export default PostList