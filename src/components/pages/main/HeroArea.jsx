import React from 'react';
import LinkButton from '@atoms/LinkButton';

const HeroArea = () => {
  return (
    //TODO: 인라인css 리팩토링필요
    <div
      style={{
        width: '100%',
        height: 'calc(100vh - 122px)',
        border: '2px solid black',
        backgroundColor: '#463214',
        display: 'grid',
        gridTemplateRows: 'repeat(4,1fr)',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '122px',
      }}
    >
      <div
        style={{
          gridRow: 2,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div style={{ color: 'white', fontSize: '28px' }}>
          ticketing system to prevent illegal transactions
        </div>
        <div style={{ color: 'white', fontSize: '86px' }}>TICKET TO TOKEN</div>
      </div>
      <div
        style={{
          gridRow: 4,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <LinkButton to="/list" name="다음페이지" />
      </div>
    </div>
  );
};

export default HeroArea;
