import React, { useState } from 'react';

const CardByToggle = ({ title, text }) => {
  const [isOpened, setIsOpened] = useState(false);
  const initialSetting = {
    borderColor: '#6D6D6D',
    pos: '0',
  };
  const changedSetting = {
    borderColor: '#7E9E10',
    pos: '100%',
  };
  const [styleSetting, setStyleSetting] = useState(initialSetting);


  // isOpen ? 닫 : 열
  return (
    //TODO: 인라인css 리팩토링필요
    <div
      style={{
        border: `2px solid ${styleSetting.borderColor}`,
        borderRadius: '30px',
        margin: '20px 150px',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        
        transition: 'max-height 0.3s ease-out',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '30px' }}>
          {title}
        </span>
        <button onClick={() => { setIsOpened((prev) => !prev);
        if(isOpened) setStyleSetting(changedSetting);
        else{setStyleSetting(initialSetting);}}}>
          {isOpened ? '닫기' : '열기'}
        </button>
      </div>
      {isOpened && (
        <div style={{ color: 'white', paddingTop: '30px',lineHeight: '150%', fontSize: '20.3px', paddingLeft: '10px'}}>{text}</div>
      )}
    </div>
  );
};

export default CardByToggle;
