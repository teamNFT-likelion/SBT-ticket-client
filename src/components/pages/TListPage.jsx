import React from 'react';
import Header from '@articles/Header';
import PosterItems from './ticketList/PosterItems';
import { Column } from '@components/atoms/wrapper.style';
import BigPoster from './ticketList/BigPoster';
import Footer from '@articles/Footer';
import LinkButton from '@components/atoms/LinkButton';

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
            gap: '4px',
            fontSize: '30px',
            marginTop: '9rem',
            marginBottom: '40px',
          }}
        >
          <LinkButton to="/list" name="공연" />
          <LinkButton to="/list" name="전시" />
          <LinkButton to="/list" name="스포츠" />
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
