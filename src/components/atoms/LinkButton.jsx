import React from 'react';
import { Link } from 'react-router-dom';

const LinkButton = ({ to = '/', name = '홈으러' }) => {
  return (
    //TODO: 인라인css 리팩토링필요
    <Link to={to}>
      <button
        style={{
          backgroundColor: '#526600',
          color: 'white',
          width: '100px',
          height: '64px',
          fontSize: '20px',
        }}
      >
        {name}
      </button>
    </Link>
  );
};

export default LinkButton;
