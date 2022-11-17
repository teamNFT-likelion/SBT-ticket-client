import React, { useState } from 'react';
import LinkButton from '@atoms/LinkButton';

const BigPoster = () => {
  const [activePosterId, setActivePosterId] = useState(0);
  return (
    <div
      style={{
        height: '500px',
        display: 'flex',
        gap: '40px',
        justifyContent: 'center',
        marginBottom: '120px',
        fontSize: '40px',
      }}
    >
      {activePosterId !== 2 && (
        <div
          style={{
            display: 'flex',
            backgroundColor: 'white',
            maxWidth: '1100px',
            flexDirection: 'row-reverse',
          }}
        >
          <div
            style={{
              width: '640px',
              backgroundColor: 'gold',
              height: '100%',
            }}
            onClick={() => {
              if (activePosterId === 0) {
                setActivePosterId(1);
              } else {
                setActivePosterId(0);
              }
            }}
          >
            1번 포스터
          </div>
          {activePosterId === 1 && (
            <div style={{ color: 'black', flex: '1' }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis,
              saepe? Sed nihil vitae aspernatur nulla omnis sit fugit, iure
              quasi!
              <LinkButton to="/detail" name="상세정보" />
              <LinkButton to="/payment" name="예매하기" />
            </div>
          )}
        </div>
      )}
      {activePosterId !== 1 && (
        <div
          style={{
            display: 'flex',
            backgroundColor: 'white',
            maxWidth: '1100px',
          }}
        >
          <div
            style={{
              width: '420px',
              backgroundColor: 'orange',
              height: '100%',
            }}
            onClick={() => {
              if (activePosterId === 0) {
                setActivePosterId(2);
              } else {
                setActivePosterId(0);
              }
            }}
          >
            2번 포스터
          </div>
          {activePosterId === 2 && (
            <div style={{ color: 'black', flex: '1' }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis,
              saepe? Sed nihil vitae aspernatur nulla omnis sit fugit, iure
              quasi!
              <LinkButton to="/detail" name="상세정보" />
              <LinkButton to="/payment" name="예매하기" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BigPoster;
