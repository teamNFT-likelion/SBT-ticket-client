import React from 'react';
import PosterItem from './PosterItem';
import styled from 'styled-components';
import useItems from '@hooks/useItems';

const Container = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 80px;
`;

const TitleWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 28px;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 0.5px solid orange;
  width: 390px;
  color: orange;
`;

const PosterWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 65px;
  grid-row-gap: 60px;
`;

const PosterItems = () => {
  const { typeItems } = useItems();

  return (
    <Container>
      <TitleWrapper>TTOT LIVE</TitleWrapper>
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
