import React from 'react';
import LinkButton from '@atoms/LinkButton';
import useHover from '@hooks/useHover';

const PosterItem = () => {
  const [hoverRef, isHover] = useHover();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
      ref={hoverRef}
    >
      {isHover && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '90%',
            justifyContent: 'center',
            gap: '16px',
            alignItems: 'center',
            position: 'absolute',
          }}
        >
          <LinkButton to="/detail" name="상세정보" />
          <LinkButton to="/payment" name="예매하기" />
        </div>
      )}
      <div
        style={{
          flex: 4,
          border: '2px solid white',
          width: '200px',
        }}
      ></div>
      <div>제목</div>
      <div>Lorem ipsum dolor sit am</div>
    </div>
  );
};

export default PosterItem;
