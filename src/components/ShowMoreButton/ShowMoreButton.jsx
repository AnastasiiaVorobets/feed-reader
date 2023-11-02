import React from 'react';
import './ShowMoreButton.scss'

function ShowMoreButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="show-more-button"
    >
      Show More
    </button>
  );
}

export default ShowMoreButton;
