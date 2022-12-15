import React from 'react';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import Layout from '@articles/Layout';
import DetailInfo from '@components/atoms/DetailInfo';
import CategoryNav from '@components/articles/CategoryNav';
import PosterItems from './ticketList/PosterItems';
import { mainItems } from '@mock/items';
import DateSelection from './tDetail/DateSelection';
import Page404 from './Page404';

const TDetailPage = () => {
  const location = useLocation();
  const { id: dataId } = parse(location.search);
  const data = mainItems.filter((item) => item.id === dataId)[0] || null;

  if (!data) {
    return <Page404 />;
  }

  return (
    <Layout>
      <CategoryNav />
      <DetailInfo data={data} />
      <DateSelection data={data} />
      <PosterItems type="concert" items={mainItems} />
      <img src={data.detailInfoImg} alt="detailInfo" width={'800px'} />
    </Layout>
  );
};

export default TDetailPage;
