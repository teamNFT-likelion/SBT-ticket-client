import React, { useState, useEffect } from 'react';
import Layout from '@articles/Layout';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import * as colors from '@styles/colors';
import { mainItems, restItems } from '@mock/items.js';
import PosterItem from './ticketList/PosterItem';
import { parse } from 'query-string';
import heroImg from '@assets/img/landing_hero_2.svg';

const Container = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 150px;
`;

const TitleWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
  font-size: 40px;
`;

const PosterWrapper = styled('div')`
  display: grid;
  min-height: 300px;
  grid-template-columns: repeat(4, 1fr);
  gap: 60px;
  background: linear-gradient(
      to bottom,
      rgba(15, 15, 15, 0) 50%,
      rgba(15, 15, 15, 0.5) 60%,
      rgba(15, 15, 15, 0.7) 70%,
      rgba(15, 15, 15, 1) 80%,
      rgba(15, 15, 15, 1) 100%
    ),
    url(${heroImg}) no-repeat center;
  background-size: cover;
`;

const QueryEmphasize = styled('span')`
  font-size: 45px;
  font-weight: 600;
  color: ${colors.natural95};
`;

const TSearchPage = () => {
  const location = useLocation();
  const parsed = parse(location.search);
  const typing = parsed.typing;
  const [typedItems, setTypedItems] = useState([]);

  // 원하는 검색어 찾기 기능
  useEffect(() => {
    const items = [...mainItems, ...restItems];
    const filterTitle = items.filter((q) => {
      return q.title.replace(' ', '').toLocaleLowerCase().includes(typing.toLocaleLowerCase());
    });
    setTypedItems(filterTitle);
  }, [typing]);

  return (
    <Layout>
      <Container>
        <TitleWrapper>
          ' <QueryEmphasize>{typing}</QueryEmphasize> ' 에 대한 검색 결과 ({typedItems.length})
        </TitleWrapper>
        <PosterWrapper>
          {typedItems.map((data) => {
            return (
              <PosterItem
                key={data.id}
                dataId={data.id}
                posterImgUrl={data.posterImgUrl}
                title={data.title}
                startDate={data.startDate}
                endDate={data.endDate}
                preTicketing={data.preTicketing}
              />
            );
          })}
        </PosterWrapper>
      </Container>
    </Layout>
  );
};

export default TSearchPage;
