import React from 'react';
import styled from 'styled-components';
import { Column, Row } from '@components/atoms/wrapper.style';
import { format } from 'date-fns';
import { SubTitle } from '@styles/ApaymentStyles';
import PreTicketingPeriod from '@utils/PreTicketingPeriod';
import * as colors from '@styles/colors';

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

const PreAlert = styled('div')`
  font-size: 25px;
  margin-bottom: 5px;
  color: ${colors.bgRed};
`;

const DetailInfo = ({ data }) => {
  return (
    <ContentsInfoBody>
      <ContentsInfo>
        <SubTitle style={{ marginBottom: '24px', fontSize: '25px' }}>
          {PreTicketingPeriod(data.
          ) && (
            <PreAlert>[사전예매 {PreTicketingPeriod(data.preTicketing)}]</PreAlert>
          )}
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
          <ConcertInfoItem>구매가</ConcertInfoItem>
          <ConcertInfoItem>{data.cashPrice.map((price) => `₩${price} `)}</ConcertInfoItem>
          <ConcertInfoItem>사전예매기간</ConcertInfoItem>
          {PreTicketingPeriod(data.preTicketing) && (
            <ConcertInfoItem style={{ color: colors.bgRed }}>
              {format(new Date(data.preTicketing[0]), 'yyyy.MM.dd')} ~
              {format(new Date(data.preTicketing[1]), 'yyyy.MM.dd')}
            </ConcertInfoItem>
          )}
        </ConcertInfo>
      </ContentsInfo>
      <img src={data.posterImgUrl} width="270px" height="345px" alt="poster" />
    </ContentsInfoBody>
  );
};

export default DetailInfo;
