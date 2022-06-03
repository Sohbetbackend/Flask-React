import './App.css';
import {useState, useEffect} from 'react';
import PostList from "./components/PostList";
import Form from './components/Form';

function App() {

  const [posts, setPosts] = useState([])
  const [editedPost, setEditedPost] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get', {
      'methods':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
        .then(resp => resp.json())
        .then(resp => setPosts(resp))
        .catch(error => console.log(error))
  },[])

  const editPost = (post) => {
    setEditedPost(post)
  }

  const updatedData = (post) => {
    const new_post = posts.map(my_post => {
      if(my_post.id === post.id) {
        return post
      } else {
        return my_post
      }
    })
    setPosts(new_post)
  }

  return (
    <div className="App">
      <h1>Flask and ReactJS Project</h1>

      <PostList posts = {posts} editPost = {editPost} />
      {editedPost ?  <Form post = {editedPost} updatedData = {updatedData}/> : null}
    </div>
  );
}

export default App;
