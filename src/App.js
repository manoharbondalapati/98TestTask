import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import PostsList from './components/PostsList';
import Post from './components/Post';
import Comments from './components/Comments';
import Login from './components/Login';


const App = () => {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/postslist' element={<PostsList/>}/>
        <Route path='/posts/:id/comments'element={<Comments/>}/>
        <Route path='/post/:id' element={<Post/>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App;






