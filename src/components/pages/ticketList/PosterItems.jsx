import React from 'react';
import PosterItem from './PosterItem';

const PosterItems = () => {
  return (
    <div
      style={{
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>공연</div>
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
