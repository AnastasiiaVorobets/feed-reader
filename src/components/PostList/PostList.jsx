import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import { formatTitle } from '../../helpers/formatTitle';
import readerImage from '../../images/readerImage.png';
import '../../styles/style.scss';
import './PostList.scss';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [newPostData, setNewPostData] = useState({ title: '', body: '' });
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error(response)
        } else {
          return response.json()
        }
      })
      .then(setPosts)
      .catch(error => {
        console.error('Error deleting post:', error);
      })
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

  const handleCreatePost = (e) => {
    e.preventDefault();

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
          throw Error('Failed to create post');
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

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const closeModal = () => {
    setShowForm(false);
  };

  return (
    loading ? (
      <h5>Loading posts...</h5>
    ) : (
      <div>
        <header className="header">
          <button
            className="button"
            onClick={() => navigate('/')}
          >
            Back
          </button>
          <img
            src={readerImage}
            alt="reader"
            className="reader__image"
          />
          <button
            className="button"
            onClick={() => navigate('/')}
          >
            LogOut
          </button>
        </header>
        <h2>Posts</h2>
        <button
          onClick={toggleForm}
          className={`open__form ${showForm ? 'hidden' : ''}`}
        >
          Click to create a post
        </button>

        {showForm && (
          <div className="modal">
            <div className="modal-content">
              <form
                onSubmit={handleCreatePost}
                className="create__post"
              >
                <input
                  className="post__data"
                  type="text"
                  placeholder="Title"
                  value={newPostData.title}
                  required
                  onChange={(e) => setNewPostData({ ...newPostData, title: e.target.value })}
                />
                <textarea
                  className="post__data"
                  placeholder="Body"
                  value={newPostData.body}
                  required
                  onChange={(e) => setNewPostData({ ...newPostData, body: e.target.value })}
                />
                <button 
                  type="submit"
                  className="create__button"
                >
                  Create Post
                </button>
              </form>

              <button 
                className="close"
                onClick={closeModal}
              >
                Close Form
              </button>
            </div>
          </div>
        )}

        <ul className="list">
          {posts.slice(0, visiblePosts).map((post) => (
            <li className="list__item" key={post.id}>
              <h3>{formatTitle(post.title)}</h3>
              <p>{formatTitle(post.body)}</p>
              <Link to={`/feeds/${post.id}`} className="detail__link">
                Read More
              </Link>

              <button
                className="delete__button"
                onClick={() => handleDeletePost(post.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {visiblePosts < posts.length && (
          <ShowMoreButton onClick={() => setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 3)} />
        )}
      </div>
    )
  );
}

export default PostList;
