import React from 'react';
import PosterItem from './PosterItem';
import styled from 'styled-components';
import useItems from '@hooks/useItems';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 25px;
  margin: 10px 0;
`;

const PosterWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 60px;
`;

const PosterItems = ({ type }) => {
  const { typeItems } = useItems();

  const getTitle = (_type) => {
    if (_type === 'concert') return '공연';
    if (_type === 'exhibit') return '전시';
    if (_type === 'sports') return '스포츠';
  };

  return (
    <Container>
      <TitleWrapper>{getTitle(type)}</TitleWrapper>
      <PosterWrapper>
        {typeItems.map((data) => (
          <PosterItem
            key={data.id}
            dataId={data.id}
            posterImgUrl={data.posterImgUrl}
            title={data.title}
            startDate={data.startDate}
            endDate={data.endDate}
            preTicketing={data.preTicketing}
            prePossible={data.prePossible}
          />
        ))}
      </PosterWrapper>
    </Container>
  );
};

export default PosterItems;
