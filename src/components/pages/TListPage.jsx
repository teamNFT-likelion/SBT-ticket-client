import React from 'react';
import Header from '@articles/Header';
import PosterItems from './ticketList/PosterItems';
import { Column } from '@components/atoms/wrapper.style';
import BigPoster from './ticketList/BigPoster';
import Footer from '@articles/Footer';

const TListPage = () => {
  return (
    <Column alignItems="center">
      <Header />
      <div
        style={{
          width: '1350px',
          padding: '0 20px',
          marginBottom: '150px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '120px',
            fontSize: '30px',
            marginTop: '40px',
            marginBottom: '40px',
          }}
        >
          <span>공연</span>
          <span>전시</span>
          <span>스포츠</span>
        </div>

        <BigPoster />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          <PosterItems />
          <PosterItems />
          <PosterItems />
        </div>
      </div>
      <Footer />
    </Column>
  );
};

export default TListPage;
