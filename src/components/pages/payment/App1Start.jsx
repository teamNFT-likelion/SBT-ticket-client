import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { TabButton } from '@styles/ApaymentStyles';
import { Row } from '@components/atoms/wrapper.style';
import TDPCalendar from '@components/atoms/Calendar';
import PartInfoContainer from '@components/articles/PartInfoContainer';
import RemainSeatsAndPay from '@components/atoms/RemainSeatsAndPay';
import verticalLine from '@assets/img/verticalLine.png';
import { tDateState, tDeadlineState, tPartState } from '@states/paymentState';
import TicketInfo from './TicketInfo';
import {
  tPerformIdState,
  sbtImageState,
  sbtNameState,
} from '@states/paymentState';
import { useEffect } from 'react';

export const App1Start = ({ setTab, data }) => {
  const [date, setDate] = useRecoilState(tDateState);
  const [part, setPart] = useRecoilState(tPartState);
  const onDateChange = (_date) => setDate(_date);
  const onPartClick = (e) => setPart(Number(e.target.value));

  const setTDeadlineState = useSetRecoilState(tDeadlineState);
  const setTPerformIdState = useSetRecoilState(tPerformIdState);
  const setSbtImageState = useSetRecoilState(sbtImageState);
  const setSbtNameState = useSetRecoilState(sbtNameState);
  // const {setSbtDescState} = useSetRecoilState(sbtDescState);

  const setSbtRecoilState = (data) => {
    setTDeadlineState(data.deadline);
    setTPerformIdState(data.id);
    setSbtImageState(data.posterImgUrl);
    setSbtNameState(data.title);

    return data.title;
  };

  useEffect(() => {
    setSbtRecoilState(data);
  });

  return (
    <StepBox>
      <LeftBox>
        <SelectInfo>
          <TDPCalendar
            dateInfo={data.dateInfo}
            onDateChange={onDateChange}
            value={date}
          />
          <img src={verticalLine} alt="verticalLine" height="260px" />
          <PartInfoContainer
            data={data}
            onPartClick={onPartClick}
            partState={part}
          />
          <img src={verticalLine} alt="verticalLine" height="260px" />
          <RemainSeatsAndPay data={data} partState={part} />
        </SelectInfo>
      </LeftBox>
      <RightBox>
        <TicketInfo data={data} />
        <Row justifyContent="center" marginTop="100px">
          <TabButton
            value="APP_SelectSeats"
            onClick={(e) => setTab(e.target.value)}
          >
            다음단계
          </TabButton>
        </Row>
      </RightBox>
    </StepBox>
  );
};

export const StepBox = styled('div')`
  display: flex;
  width: 100%;
  border: 0.75px solid #eaecd9;
`;

export const LeftBox = styled('div')`
  flex: 2.5;
  display: flex;
  flex-direction: column;
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
/* <PageTitle>티켓 결제</PageTitle>
      <SubTitle>| 선택한 공연 정보 |</SubTitle>
      <DetailInfo dataId={dataId} />
      <SubTitle>| YOUR INACTIVE TICKETS |</SubTitle>
      <Row>
        {DummyData.map((ticket) => (
          <Ticket
            id={ticket.id}
            image={ticket.image}
            title={ticket.title}
            date={ticket.date}
            active={ticket.active}
            key={ticket.id}
          />
        ))}
      </Row>

      <TabButton
        value="APP_SelectSeats"
        onClick={(newTab) => {
          setTab(newTab.target.value);
        }}
      >
        예매하기
      </TabButton> */
