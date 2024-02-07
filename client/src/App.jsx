import './App.css';
import Posts from './components/Posts';
import Post from './components/Post';
import { Routes, Route } from 'react-router-dom';
import { PostProvider } from './context/PostContext'
function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Posts />}></Route>
        <Route path="/post" element={<Posts></Posts>}></Route>
        <Route path="/post/:id" element={<PostProvider>
          <Post></Post>
        </PostProvider>}></Route>
      </Routes>
    </div>
  );
}

export default App;
