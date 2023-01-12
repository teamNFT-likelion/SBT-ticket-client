import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import verticalLine from '@assets/img/verticalLine.png';
import { CalendarStyle, PartButtonContainer, SelectInfoBox } from '@styles/ticketDetailStyle';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { Row } from '@atoms/wrapper.style';
import {
  myAPPStep,
  tDateState,
  tDeadlineState,
  tPartState,
  tPerformIdState,
  sbtImageState,
  sbtNameState,
  sbtDescState,
  preTicketState,
  tPriceState,
  tSeatState,
  tPricePerTokenState,
  tTokenPriceState,
} from '@states/paymentState';
import { TabButton } from '@styles/ApaymentStyles';
import Calendar from 'react-calendar';
import TicketInfo from './TicketInfo';
import PreTicketingPeriod from '@utils/PreTicketingPeriod';

export const App1Start = ({ data, inactiveId }) => {
  const minDate = new Date(data.startDate) || null;
  const maxDate = new Date(data.endDate) || null;

  const [date, setDate] = useState(minDate);
  const [part, setPart] = useState(0);
  const [deadline, setDeadline] = useState(data.dateInfo[minDate.getTime()][0].startTime);

  const setTab = useSetRecoilState(myAPPStep);
  const setTicketDate = useSetRecoilState(tDateState);
  const setTicketPart = useSetRecoilState(tPartState);
  const setTicketDeadline = useSetRecoilState(tDeadlineState);
  const setTicketPerformId = useSetRecoilState(tPerformIdState);
  const setSbtImage = useSetRecoilState(sbtImageState);
  const setSbtName = useSetRecoilState(sbtNameState);
  const setSbtDesc = useSetRecoilState(sbtDescState);
  const setSeatsIds = useSetRecoilState(tSeatState);

  // 사전예매 기간 상태 저장을 위한 Recoil
  const setPreTState = useSetRecoilState(preTicketState);

  const setSbtRecoilState = useCallback(() => {
    setTicketDate(date);
    setTicketPart(part);
    setTicketDeadline(deadline);
    setTicketPerformId(data.id);
    setSbtImage(data.posterImgUrl);
    setPreTState(PreTicketingPeriod(data.preTicketing));
    setSbtName(data.title);
    setSbtDesc('');
    setSeatsIds([]);
  }, [
    date,
    part,
    deadline,
    data.id,
    data.posterImgUrl,
    data.title,
    setTicketDate,
    setTicketPart,
    setTicketDeadline,
    setTicketPerformId,
    setSbtImage,
    setSbtName,
    setSbtDesc,
    data.preTicketing,
    setPreTState,
    setSeatsIds,
  ]);

  const resetTicketPrice = useResetRecoilState(tPriceState);
  const resetTicketSeat = useResetRecoilState(tSeatState);
  const resetPricePerToken = useResetRecoilState(tPricePerTokenState);
  const resetTicketTokenPrice = useResetRecoilState(tTokenPriceState);

  useEffect(() => {
    setSbtRecoilState(data);
    resetTicketPrice();
    resetTicketSeat();
    resetPricePerToken();
    resetTicketTokenPrice();
  }, [
    data,
    setSbtRecoilState,
    resetTicketPrice,
    resetTicketSeat,
    resetPricePerToken,
    resetTicketTokenPrice,
  ]);

  const handleDateClick = (_date) => {
    setDate(_date);
    setPart(0);
    setDeadline(data.dateInfo[_date.getTime()][0].startTime);
  };
  const handlePartClick = (e) => {
    const newPart = Number(e.target.value);
    setPart(newPart);
    setDeadline(data.dateInfo[date.getTime()][newPart].startTime);
  };

  return (
    <>
      <StepBox>
        <LeftBox>
          <SelectInfo>
            <CalendarStyle>
              <Calendar
                onChange={handleDateClick}
                value={date}
                minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                maxDetail="month"
                calendarType="US"
                formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
                minDate={minDate}
                maxDate={maxDate}
              />
            </CalendarStyle>
            <img src={verticalLine} alt="verticalLine" height="260px" />
            <SelectInfoBox>
              회차
              <PartButtonContainer>
                {data.dateInfo[date.getTime()].map((info, index) => (
                  <TabButton
                    key={info.startTime}
                    value={index}
                    onClick={handlePartClick}
                    style={{
                      width: '70px',
                      height: '30px',
                      fontSize: '15px',
                      backgroundColor: part === index ? 'orange' : colors.primary40,
                    }}
                  >
                    {index + 1}회차
                  </TabButton>
                ))}
              </PartButtonContainer>
              CAST
              <span style={{ paddingTop: '10px' }}>{data.cast}</span>
            </SelectInfoBox>
            <img src={verticalLine} alt="verticalLine" height="260px" />
            <SelectInfoBox>
              잔여석
              <span style={{ padding: '10px', fontSize: '20px', color: colors.bgRed }}>
                {data.dateInfo[date.getTime()][part].seatCount}석
              </span>
            </SelectInfoBox>
          </SelectInfo>
        </LeftBox>
        <RightBox>
          <TicketInfo data={data} inactiveId={inactiveId} />
          <Row justifyContent="center" marginTop="50px">
            <TabButton value="APP_SelectSeats" onClick={(e) => setTab(e.target.value)}>
              다음단계
            </TabButton>
          </Row>
        </RightBox>
      </StepBox>
    </>
  );
};

export const StepBox = styled('div')`
  display: flex;
  width: 100%;
  border: 0.75px solid #eaecd9;
`;

export const LeftBox = styled('div')`
  flex: 2.5;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

export const RightBox = styled('div')`
  flex: 1;
  flex-direction: column;
  border-left: 1px solid white;
  padding: 30px;
  font-size: 20px;
  min-height: 400px;
  display: flex;
  justify-content: space-between;
  width: 390px;
  position: relative; // loading 위치
`;

const SelectInfo = styled('div')`
  width: 900px;
  display: flex;
  background-color: #d9d9d915;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  align-self: flex-start;
`;
