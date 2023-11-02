import React, { useState, useEffect } from 'react';
import PostList from '../components/PostList/PostList';

function FeedListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [newPostData, setNewPostData] = useState({ title: '', body: '' });

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

  return (
    <div>
      {loading ? (
        <h5>Loading posts...</h5>
      ) : (
        <PostList
          posts={posts}
          handleDeletePost={handleDeletePost}
          visiblePosts={visiblePosts}
          setVisiblePosts={setVisiblePosts}
          handleCreatePost={handleCreatePost}
          newPostData={newPostData}
          setNewPostData={setNewPostData}
        />
      )}
    </div>
  );
}

export default FeedListPage;
