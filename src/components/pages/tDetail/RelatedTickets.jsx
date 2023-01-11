import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled('div')`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 900px;
  min-height: 365px;
  margin-bottom: 3rem;
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
  gap: 50px;
  border: 1px solid orange;
  width: 900px;
  min-height: 280px;
  padding: 25px;
`;

const PosterImg = styled('img')`
  height: 200px;
  width: 175px;
  border: 3px solid white;
  border-radius: 20px;
`;

const PosterTitle = styled('span')`
  width: 243px;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RelatedTickets = ({ items, data }) => {
  const [preList, setPreList] = useState([]);
  useEffect(() => {
    function relatedItems() {
      for (let i = 0; i < data.length; i++) {
        const item = items.filter((each) => each.id === data[i])[0] || null;
        console.log(item);
        setPreList([...preList, item]);
      }
    }
    relatedItems();
  }, [data, items]);

  return (
    <Container>
      <TitleWrapper>RELATED TTOT</TitleWrapper>
      <PosterWrapper>
        {data.length === 0 ? (
          <span style={{ color: 'red', fontSize: '20px' }}>관련된 티켓이 없습니다.</span>
        ) : (
          preList.map((poster) => (
            <div key={poster.id}>
              <PosterImg src={poster.posterImgUrl} alt="poster" />
              <PosterTitle>{poster.title}</PosterTitle>
            </div>
          ))
        )}
      </PosterWrapper>
    </Container>
  );
};

export default RelatedTickets;
