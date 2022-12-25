import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import verticalLine from '@assets/img/verticalLine.png';
import TDPCalendar from '@atoms/Calendar';
import PartInfoContainer from '@articles/PartInfoContainer';
import RemainSeatsAndPay from '@atoms/RemainSeatsAndPay';
import { ButtonsWrapper, ContentsInfoBody } from '@styles/ticketDetailStyle';
import { tDateState, tPartState } from '@states/paymentState';
import { useNavigate } from 'react-router-dom';

const DateSelection = ({ data }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [part, setPart] = useState(0);
  const setTicketDate = useSetRecoilState(tDateState);
  const setTicketPart = useSetRecoilState(tPartState);

  const onReserveClick = () => {
    setTicketDate(date);
    setTicketPart(part);
    navigate(`/payment?id=${data.id}`, {
      state: { tab: 'APP_SelectSeats' },
    });
  };

  const handleDateChange = (_date) => setDate(_date);
  const handlePartClick = (e) => setPart(Number(e.target.value));

  return (
    <ContentsInfoBody>
      <SelectInfo>
        <TDPCalendar dateInfo={data.dateInfo} onDateChange={handleDateChange} value={date} />
        <img src={verticalLine} alt="verticalLine" height="260px" />
        <PartInfoContainer data={data} onPartClick={handlePartClick} partState={part} />
        <img src={verticalLine} alt="verticalLine" height="260px" />
        <RemainSeatsAndPay data={data} partState={part} />
      </SelectInfo>
      <ButtonsWrapper>
        <Button onClick={onReserveClick}>예매하기</Button>
      </ButtonsWrapper>
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
  margin: 3px;
`;

export default DateSelection;
