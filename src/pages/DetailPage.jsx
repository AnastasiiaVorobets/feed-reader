import '../styles/DetailPage.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function DetailPage({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleComments, setVisibleComments] = useState(7);
  const navigate = useNavigate();

  function formatTitle(title) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postsId=${postId}`);

        if (response.status === 200) {
          const data = await response.json();
          setComments(data);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch comments');
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  if (loading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>Error loading comments: {error.message}</div>;
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
      <h3>Comments:</h3>
      <ul className='comments__list'>
        {comments.slice(0, visibleComments).map((comment) => (
          <li key={comment.id} className='comments__item'>
            <h4>{formatTitle(comment.name)}</h4>
            <p>{formatTitle(comment.body)}</p>
          </li>
        ))}
      </ul>
      {visibleComments < comments.length && (
        <button
          onClick={() => setVisibleComments((prevVisibleComments) => prevVisibleComments + 7)} 
          className="show-more-button"
        >
          Show More
        </button>
      )}
    </div>
  );
}

export default DetailPage;