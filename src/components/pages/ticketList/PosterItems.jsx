import React from 'react';
import PosterItem from './PosterItem';

const PosterItems = ({ type }) => {
  const getTitle = (_type) => {
    if (_type === 'concert') return '공연';
    if (_type === 'exhibit') return '전시';
    if (_type === 'sports') return '스포츠';
  };
  return (
    <div
      style={{
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>{getTitle(type)}</div>
      <div
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <PosterItem />
        <PosterItem />
        <PosterItem />
        <PosterItem />
        <PosterItem />
      </div>
    </div>
  );
};

export default PosterItems;
