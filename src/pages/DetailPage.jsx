import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowMoreButton from '../components/ShowMoreButton/ShowMoreButton';
import { formatTitle } from '../helpers/formatTitle';
import '../styles/style.scss'

function DetailPage({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleComments, setVisibleComments] = useState(7);
  const navigate = useNavigate();

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
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <div>
      {loading ? (
        <h5>Loading comments...</h5>
      ) : (
        <div>
          <header className="back">
            <button
              className="back__button"
              onClick={() => navigate('/feeds')}
            >
              Go Back
            </button>
          </header>
          <h3>Comments:</h3>
          <ul className='list'>
            {comments.slice(0, visibleComments).map((comment) => (
              <li key={comment.id} className='list__item'>
                <h4>{formatTitle(comment.name)}</h4>
                <p>{formatTitle(comment.body)}</p>
              </li>
            ))}
          </ul>
          {visibleComments < comments.length && (
          <ShowMoreButton
            onClick={() => setVisibleComments((prevVisibleComments) => prevVisibleComments + 7)} 
          />
      )}
        </div>
      )}
    </div>
  );
}

export default DetailPage;