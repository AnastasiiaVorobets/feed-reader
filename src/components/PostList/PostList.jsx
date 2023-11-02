import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import { formatTitle } from '../../helpers/formatTitle';
import readerImage from '../../images/readerImage.png'
import '../../styles/style.scss';
import './PostList.scss';

function PostList({
  posts,
  handleDeletePost,
  visiblePosts,
  setVisiblePosts,
  handleCreatePost,
  newPostData,
  setNewPostData,
}) {
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const closeModal = () => {
    setShowForm(false);
  };

  return (
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
          className='reader__image'
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
        Сlick to create a post
      </button>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleCreatePost} className="create__post">
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
              <button type="submit" className="create__button">
                Create Post
              </button>
            </form>

            <button className="close" onClick={closeModal}>
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

            <button className="delete__button" onClick={() => handleDeletePost(post.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {visiblePosts < posts.length && (
        <ShowMoreButton onClick={() => setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 3)} />
      )}
    </div>
  );
}

export default PostList;
