import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@articles/Layout';
import PosterItems from './ticketList/PosterItems';
import BigPoster from './ticketList/BigPoster';

const TListPage = () => {
  const navigate = useNavigate();
  return (
    <Layout page="list-page">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px',
          fontSize: '28px',
        }}
      >
        <span
          style={{
            borderRight: '2px solid white',
            width: '130px',
            textAlign: 'center',
          }}
        >
          공연
        </span>
        <span
          style={{
            borderRight: '2px solid white',
            width: '130px',
            textAlign: 'center',
            border: '2px solid yellow',
          }}
          onClick={() => navigate('/list', { state: { id: 'juncy' } })}
        >
          전시
        </span>
        <span
          style={{
            width: '130px',
            textAlign: 'center',
          }}
        >
          스포츠
        </span>
      </div>
      <BigPoster />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        <PosterItems />
      </div>
    </Layout>
  );
};

export default TListPage;
