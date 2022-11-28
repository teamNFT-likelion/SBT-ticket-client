import React from 'react';
import Layout from '@articles/Layout';
import PosterItems from './ticketList/PosterItems';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import * as colors from '@styles/colors'

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
`

const PosterWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const QueryEmphasize = styled('span')`
  font-size: 45px;
  font-weight: 600;
  color: ${colors.natural95};
`

const TSearchPage = () => {
  const location = useLocation();
  const { query } = location.state;

  // 원하는 검색어 찾기 기능
//   const filterTitle = DummyData.filter((q) => {
//     return q.title
//       .replace(' ', '')
//       .toLocaleLowerCase()
//       .includes(query.toLocaleLowerCase());
//   });

  return (
    <Layout>
      <Container>
        <TitleContainer>
          <TitleWrapper>
            '{' '}
            <QueryEmphasize>{query}</QueryEmphasize>
            {' '}' 에 대한 검색 결과 (25)
          </TitleWrapper>
        </TitleContainer>
        <PosterWrapper>
          <PosterItems type="concert" />
          <PosterItems type="exhibit" />
          <PosterItems type="sports" />
        </PosterWrapper>
      </Container>
    </Layout>
  );
};

export default TSearchPage;
