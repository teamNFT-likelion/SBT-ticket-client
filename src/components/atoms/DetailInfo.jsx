import React from 'react';
import styled from 'styled-components';
import { Row } from '@components/atoms/wrapper.style';
import { format } from 'date-fns';
import PreTicketingPeriod from '@utils/PreTicketingPeriod';
import * as colors from '@styles/colors';

const ContentsInfo = styled(Row)`
  width: 800px;
  height: 345px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 30px 0;
`;

const SubTitle = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin: 20px 0;
  color: ${colors.primary80};
`;

const PreAlert = styled('div')`
  color: ${colors.bgRed};
`;

const ConcertInfo = styled('div')`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
`;

const ConcertInfoTitle = styled('span')`
  font-size: 20px;
  font-weight: 500;
`

const ConcertInfoItem = styled('span')`
  font-size: 18px;
  font-weight: 500;
  font-family: sans-serif;
`;

const ConcertImg = styled('img')`
  width: 270px;
  height: 345px;
  border-radius: 20px;
  border: 2px #eaecd9 solid;
`;

const DetailInfo = ({ data }) => {
  return (
    <div>
      <SubTitle>
        {PreTicketingPeriod(data.preTicketing) && (
          <PreAlert>[사전예매 {PreTicketingPeriod(data.preTicketing)}]</PreAlert>
        )}
        &nbsp;{data.title}
      </SubTitle>
      <ContentsInfo>
        <ConcertInfo>
          <ConcertInfoTitle>공연기간</ConcertInfoTitle>
          <ConcertInfoItem>
            {format(new Date(data.startDate), 'yyyy.MM.dd')} ~&nbsp;
            {format(new Date(data.endDate), 'yyyy.MM.dd')}
          </ConcertInfoItem>
          <ConcertInfoTitle>장소</ConcertInfoTitle>
          <ConcertInfoItem>{data.place}</ConcertInfoItem>
          <ConcertInfoTitle>공연시간</ConcertInfoTitle>
          <ConcertInfoItem>{data.runningTime}분</ConcertInfoItem>
          <ConcertInfoTitle>관람연령</ConcertInfoTitle>
          <ConcertInfoItem>{data.viewAgeName}</ConcertInfoItem>
          <ConcertInfoTitle>구매가</ConcertInfoTitle>
          <ConcertInfoItem>{data.cashPrice.map((price) => `₩${price} `)}</ConcertInfoItem>
          <ConcertInfoTitle>사전예매기간</ConcertInfoTitle>
          {PreTicketingPeriod(data.preTicketing) && (
            <ConcertInfoItem style={{ color: colors.bgRed }}>
              {format(new Date(data.preTicketing[0]), 'yyyy.MM.dd')} ~
              {format(new Date(data.preTicketing[1]), 'yyyy.MM.dd')}
            </ConcertInfoItem>
          )}
        </ConcertInfo>
        <ConcertImg src={data.posterImgUrl} alt="poster" />
      </ContentsInfo>
    </div>
  );
};

export default DetailInfo;
