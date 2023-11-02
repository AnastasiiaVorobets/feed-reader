import React from 'react';
import { useNavigate } from 'react-router-dom';
import reader from '../../images/reader.png';
import './Header.scss';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <button
        className="button"
        onClick={() => navigate('/')}
      >
        Back
      </button>

      <img
        src={reader}
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
  );
}

export default Header;
