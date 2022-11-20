import React from 'react';
import Layout from '@articles/Layout';
import PosterItems from './ticketList/PosterItems';

const TSearchPage = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default TSearchPage;
