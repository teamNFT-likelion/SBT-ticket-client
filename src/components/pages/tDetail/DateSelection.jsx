import React, { useState } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { format } from 'date-fns';
import verticalLine from '@assets/img/verticalLine.png';
import {
  ButtonsWrapper,
  ContentsInfoBody,
  CalendarStyle,
  PartButtonContainer,
  SelectInfoBox,
} from '@styles/ticketDetailStyle';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  tDateState,
  tDeadlineState,
  tPartState,
  tPerformIdState,
  sbtImageState,
  sbtNameState,
  sbtDescState,
} from '@states/paymentState';
import { TabButton } from '@styles/ApaymentStyles';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import PreTicketingPeriod from '@utils/PreTicketingPeriod';
import { walletConnectError } from '@utils/toastMessages';
import { userState } from '@states/userState';

const DateSelection = ({ data, prePossible }) => {
  const navigate = useNavigate();

  const minDate = new Date(data.startDate) || null;
  const maxDate = new Date(data.endDate) || null;

  const [date, setDate] = useState(minDate);
  const [part, setPart] = useState(0);
  const [deadline, setDeadline] = useState(data.dateInfo[minDate.getTime()][0].startTime);

  const setTicketDate = useSetRecoilState(tDateState);
  const setTicketPart = useSetRecoilState(tPartState);
  const setTicketDeadline = useSetRecoilState(tDeadlineState);
  const setTicketPerformId = useSetRecoilState(tPerformIdState);
  const setSbtImage = useSetRecoilState(sbtImageState);
  const setSbtName = useSetRecoilState(sbtNameState);
  const setSbtDesc = useSetRecoilState(sbtDescState);

  const { account } = useRecoilValue(userState);

  const BookButton = () => {
    if (prePossible && PreTicketingPeriod(data.preTicketing) === '진행중') {
      return (
        <ButtonsWrapper>
          <Button onClick={onReserveClick}>사전예매</Button>
        </ButtonsWrapper>
      );
    } else if (PreTicketingPeriod(data.preTicketing) === '전') {
      return (
        <ButtonsWrapper>
          <Button
            disabled
            style={{ opacity: '0.8', backgroundColor: colors.primary40, cursor: 'default' }}
          >
            사전예매
          </Button>
        </ButtonsWrapper>
      );
    } else if (!prePossible && PreTicketingPeriod(data.preTicketing) === '진행중') {
      return (
        <ButtonsWrapper>
          <Button
            disabled
            style={{ opacity: '0.8', backgroundColor: colors.primary40, cursor: 'default' }}
          >
            사전예매
          </Button>
        </ButtonsWrapper>
      );
    } else {
      return (
        <ButtonsWrapper>
          <Button onClick={onReserveClick}>예매하기</Button>
        </ButtonsWrapper>
      );
    }
  };

  const onReserveClick = () => {
    setTicketDate(date);
    setTicketPart(part);
    setTicketDeadline(deadline);
    setTicketPerformId(data.id);
    setSbtImage(data.posterImgUrl);
    setSbtName(data.title);
    setSbtDesc('');
    if (!account) {
      walletConnectError();
    } else {
      navigate(`/payment?id=${data.id}`, {
        state: { tab: 'APP_SelectSeats' },
      });
    }
  };

  const handleDateClick = (_date) => {
    setDate(_date);
    setPart(0);
    setDeadline(data.dateInfo[_date.getTime()][0].startTime);
  };
  const handlePartClick = (e) => {
    setPart(Number(e.target.value));
    setDeadline(data.dateInfo[date.getTime()][Number(e.target.value)].startTime);
  };

  return (
    <ContentsInfoBody>
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
                  height: '50px',
                  fontSize: '15px',
                  backgroundColor: part === index ? 'orange' : colors.primary40,
                }}
              >
                {index + 1}회차
                <br/>
                {format(new Date(info.startTime), 'HH:mm')}
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
      <BookButton />
    </ContentsInfoBody>
  );
};

const SelectInfo = styled('div')`
  width: 100%;
  display: flex;
  background-color: #d9d9d915;
  border: 0.75px #eaecd9 solid;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  font-size: 17px;
`;

const Button = styled('button')`
  background-color: #526600;
  color: white;
  width: 100px;
  height: 64px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 5px;
  margin: 20px 20px 0 0;
`;

export default DateSelection;
