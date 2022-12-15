import React from 'react';
import styled from 'styled-components';
import { Column, Row } from '@components/atoms/wrapper.style';
import { mainItems } from 'src/mock/items';
import { format } from 'date-fns';
import { SubTitle } from '@styles/ApaymentStyles';

const ContentsInfoBody = styled(Row)`
  // HEADER 높이 5rem + 여분 9rem
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  margin-bottom: 2rem;
`;

const ContentsInfo = styled(Column)`
  width: 273px;
  height: 345px;
  /* justify-content: center; */
  align-items: center;
  margin: 10px;
`;

const ConcertInfo = styled('div')`
  display: grid;
  grid-template-columns: 2fr 4fr;
  margin-top: 20px;
  column-gap: 0.9rem;
  row-gap: 0.9rem;
`;
const ConcertInfoItem = styled('div')`
  font-size: 13px;
  font-family: sans-serif;
`;

function getData(dataId) {
  const data = mainItems.filter((item) => item.id === dataId)[0];
  return data;
}

const DetailInfo = ({ data }) => {
  return (
    <ContentsInfoBody>
      <ContentsInfo>
        <SubTitle style={{ marginBottom: '24px', fontSize: '25px' }}>
          {data.title}
        </SubTitle>
        <ConcertInfo>
          <ConcertInfoItem>공연기간</ConcertInfoItem>
          <ConcertInfoItem>
            {format(new Date(data.startDate), 'yyyy.MM.dd')} ~
            {format(new Date(data.endDate), 'yyyy.MM.dd')}
          </ConcertInfoItem>
          <ConcertInfoItem>장소</ConcertInfoItem>
          <ConcertInfoItem>{data.place}</ConcertInfoItem>
          <ConcertInfoItem>공연시간</ConcertInfoItem>
          <ConcertInfoItem>{data.runningTime}분</ConcertInfoItem>
          <ConcertInfoItem>관람연령</ConcertInfoItem>
          <ConcertInfoItem>{data.viewAgeName}</ConcertInfoItem>
          <ConcertInfoItem>현금구매가</ConcertInfoItem>
          <ConcertInfoItem>₩ {data.cashPrice}</ConcertInfoItem>
          <ConcertInfoItem>코인구매가</ConcertInfoItem>
          <ConcertInfoItem>MATIC {data.tokenPrice}</ConcertInfoItem>
        </ConcertInfo>
      </ContentsInfo>
      <img src={data.posterImgUrl} width="270px" height="345px" alt="poster" />
    </ContentsInfoBody>
  );
};

export default DetailInfo;
