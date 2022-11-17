import React from 'react';
import Header from '@articles/Header';
import Footer from '@articles/Footer';
import SearchBar from '@articles/SearchBar';
import { Column } from '@components/atoms/wrapper.style';
import PosterItems from './ticketList/PosterItems';

const TSearchPage = () => {
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
            marginTop: '40px',
            marginBottom: '60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <SearchBar />
          <div style={{ marginTop: '40px', fontSize: '40px' }}>
            ‘ 마틸다 ’ 에 대한 검색 결과 (1)
          </div>
        </div>

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

export default TSearchPage;
