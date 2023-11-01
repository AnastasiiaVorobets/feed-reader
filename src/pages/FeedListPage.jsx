import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/FeedListPage.css';

function FeedListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [visiblePosts, setVisiblePosts] = useState(7);
  const [newPostData, setNewPostData] = useState({ title: '', body: '' });

  useEffect(() => {
    setError(null);
    setLoading(true);

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        if (!res.ok) {
          throw new Error(res)
        } else {
          return res.json()
        }
      })
      .then(setPosts)
      .catch((e) => setError(e))
      .finally(() => setLoading(false))
  }, [])

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Post deleted successfully');
        } else {
          console.error('Failed to delete post');
        }
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  const handleCreatePost = () => {

    if (!newPostData.title || !newPostData.body) {
      return;
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(newPostData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(response => {
      if (response.ok) {
        console.log('Post created successfully');
        return response.json();
      } else {
        console.error('Failed to create post');
        throw new Error('Failed to create post');
      }
    })
    .then(createdPost => {
      setPosts([createdPost, ...posts]);
      setNewPostData({ title: '', body: '' });
    })
    .catch(error => {
      console.error('Error creating post:', error);
    });
  };

  function formatTitle(title) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  return (
    <div>
      <div className="back">
        <button
          className="back__button"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>

      <h2>Posts</h2>

      <form
        onSubmit={handleCreatePost}
        className='create__post'
      >
        <input
          type="text"
          placeholder="Title"
          value={newPostData.title}
          onChange={(e) => setNewPostData({ ...newPostData, title: e.target.value })}
        />
        <textarea
          placeholder="Body"
          value={newPostData.body}
          onChange={(e) => setNewPostData({ ...newPostData, body: e.target.value })}
        />
        <button
          type="submit"
          className='create__button'
        >
          Create Post
        </button>
      </form>

      <ul className='list'>
        {posts.slice(0, visiblePosts).map((post) => (
          <li className='list__item' key={post.id}>
            <h3>{formatTitle(post.title)}</h3>
            <p>{formatTitle(post.body)}</p>
            <Link to={`/feeds/${post.id}`} className="detail__link">
              Read More
            </Link>
            
            <button
              className='delete__button'
              onClick={() => handleDeletePost(post.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {visiblePosts < posts.length && (
        <button
          onClick={() => setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 7)} 
          className="show-more-button"
        >
          Show More
        </button>
      )}
    </div>
  );
}

export default FeedListPage;
