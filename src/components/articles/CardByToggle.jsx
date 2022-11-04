import React, { useState } from 'react';

const CardByToggle = ({ title, text, initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  return (
    //TODO: 인라인css 리팩토링필요
    <div
      style={{
        border: '2px solid white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{title}</span>
        <button onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? '닫기' : '열기'}
        </button>
      </div>
      {isOpen && <div style={{ color: 'white' }}>{text}</div>}
    </div>
  );
};

export default CardByToggle;
