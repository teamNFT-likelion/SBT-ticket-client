import React from 'react';
import styled from 'styled-components';
import { Column, Row } from '@components/atoms/wrapper.style';

const ContentsInfoBody = styled(Row)`
  // HEADER 높이 5rem + 여분 9rem
  color: white;
  display: flex;
  justify-content: center;
  margin: 2rem;
`;

const ContentsInfo = styled(Column)`
  width: 273px;
  height: 345px;
  border: 3px solid white;
  justify-content: center;
  align-items: center;
`;

const DetailInfo = () => {
  return (
    <ContentsInfoBody>
      <ContentsInfo>Info</ContentsInfo>
      <ContentsInfo>Poster</ContentsInfo>
    </ContentsInfoBody>
  );
};

export default DetailInfo;
