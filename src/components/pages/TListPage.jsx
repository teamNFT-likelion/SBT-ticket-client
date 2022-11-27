import React from 'react';
import PosterItems from './ticketList/PosterItems';
import BigPoster from './ticketList/BigPoster';
import LinkButton from '@components/atoms/LinkButton';
import Layout from '@articles/Layout';
import Footer from '@articles/Footer';

const TListPage = () => {
  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '4px',
          fontSize: '30px',
          marginTop: '40px',
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
    </Layout>
  );
};

export default TListPage;
