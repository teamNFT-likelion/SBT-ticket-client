import React from 'react';
import Layout from '@articles/Layout';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import * as colors from '@styles/colors';
import items from './ticketList/items.json';
import PosterItem from './ticketList/PosterItem';

const Container = styled('div')`
  width: 1350px;
  padding: 0 20px;
  margin-bottom: 150px;
`;

const TitleContainer = styled('div')`
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled('div')`
  margin-top: 40px;
  font-size: 40px;
`;

const PosterWrapper = styled('div')`
  display: grid;
  height: 300px;
  grid-template-columns: repeat(5, 1fr);
  gap: 60px;
`;

const QueryEmphasize = styled('span')`
  font-size: 45px;
  font-weight: 600;
  color: ${colors.natural95};
`;

const TSearchPage = () => {
  const location = useLocation();
  const { typing } = location.state;

  // 원하는 검색어 찾기 기능
  const filterTitle = items.filter((q) => {
    return q.title
      .replace(' ', '')
      .toLocaleLowerCase()
      .includes(typing.toLocaleLowerCase());
  });

  return (
    <Layout>
      {console.log(filterTitle)}
      <Container>
        <TitleContainer>
          <TitleWrapper>
            ' <QueryEmphasize>{typing}</QueryEmphasize> ' 에 대한 검색 결과 (
            {filterTitle.length})
          </TitleWrapper>
        </TitleContainer>
        <PosterWrapper>
          {filterTitle.map((data) => {
            return(
              <PosterItem
                key={data.id}
                posterImgUrl={data.posterImgUrl}
                title={data.title}
                startDate={data.startDate}
                endDate={data.endDate}
              />
            );
          })}
        </PosterWrapper>
      </Container>
    </Layout>
  );
};

export default TSearchPage;
