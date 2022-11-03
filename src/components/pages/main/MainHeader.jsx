import React from 'react';

const MainHeader = ({ onNavClick }) => {
  return (
    //TODO: 인라인css 리팩토링필요
    <div
      style={{
        //TODO: headerHeight 변수화 필요
        height: '122px',
        width: '100%',
        border: '2px solid black',
        alignItems: 'center',
        display: 'flex',
        padding: '0 20px',
        position: 'fixed',
        top: 0,
        backgroundColor: '#FFFFF6',
        zIndex: 999,
      }}
    >
      <div
        style={{
          minWidth: '262px',
          height: '52px',
          backgroundColor: '#526600',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '32px',
        }}
      >
        로고
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: '100%',
          height: '100%',
          marginLeft: '24px',
          fontSize: '32px',
        }}
      >
        <button style={{ fontSize: '32px' }} onClick={onNavClick} value="goal">
          문제
        </button>
        <button
          style={{ fontSize: '32px' }}
          onClick={onNavClick}
          value="benefit"
        >
          장점
        </button>
        <button
          style={{ fontSize: '32px' }}
          onClick={onNavClick}
          value="roadmap"
        >
          로드맵
        </button>
        <button style={{ fontSize: '32px' }} onClick={onNavClick} value="faq">
          QnA
        </button>
      </div>
    </div>
  );
};

export default MainHeader;
