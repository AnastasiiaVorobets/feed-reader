import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import { formatTitle } from '../../helpers/formatTitle';
import '../../styles/style.scss';
import './PostList.scss'

function PostList({
    posts,
    handleDeletePost,
    visiblePosts,
    setVisiblePosts,
    handleCreatePost,
    newPostData,
    setNewPostData
  }) {
  const navigate = useNavigate();

  return (
    <div>
      <header className="buttons">
        <button
          className="button"
          onClick={() => navigate('/')}
        >
          Back
        </button>

        <button
          className="button"
          onClick={() => navigate('/')}
        >
          LogOut
        </button>
      </header>

      <h2>Posts</h2>

      <form
        onSubmit={handleCreatePost}
        className='create__post'
      >
        <input
          className='post__data'
          type="text"
          placeholder="Title"
          value={newPostData.title}
          required
          onChange={(e) => setNewPostData({ ...newPostData, title: e.target.value })}
        />
        <textarea
          className='post__data'
          placeholder="Body"
          value={newPostData.body}
          required
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
        <ShowMoreButton onClick={() => setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 3)} />
      )}
    </div>
  );
}

export default PostList;
