import React from 'react';
import * as colors from '@styles/colors';
import { TabButton } from '@styles/ApaymentStyles';
import { Row } from '@components/atoms/wrapper.style';
import TDPCalendar from '@components/atoms/Calendar';
import PartInfoContainer from '@components/articles/PartInfoContainer';
import RemainSeatsAndPay from '@components/atoms/RemainSeatsAndPay';
import verticalLine from '@assets/img/verticalLine.png';
import { tDateState, tPartState } from '@states/ticketState';
import { useRecoilState } from 'recoil';
import { format } from 'date-fns';
import styled from 'styled-components';

export const App1Start = ({ setTab, data }) => {
  const [date, setDate] = useRecoilState(tDateState);
  const [part, setPart] = useRecoilState(tPartState);
  const onDateChange = (_date) => setDate(_date);
  const onPartClick = (e) => setPart(Number(e.target.value));

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        width: '100%',
        border: '0.75px solid #eaecd9',
      }}
    >
      <div
        style={{
          flex: 2.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '30px',
        }}
      >
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
      </div>
      <div
        style={{
          flex: 1,
          flexDirection: 'column',
          borderLeft: '1px solid white',
          padding: '30px',
          fontSize: '20px',
        }}
      >
        <img
          src={data.posterImgUrl}
          alt="img"
          style={{ width: '50px', marginBottom: '6px' }}
        />

        <div>{data.title}</div>
        <div
          style={{
            marginTop: '50px',
            marginBottom: '8px',
            color: colors.primary40,
          }}
        >
          예매정보
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid white',
            borderBottom: '1px solid white',
            padding: '8px 0',
          }}
        >
          <div>일시</div>
          <div>
            {format(new Date(date), 'yyyy.MM.dd')}{' '}
            {data.dateInfo[part].startTime}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid white',
            borderBottom: '1px solid white',
            padding: '8px 0',
          }}
        >
          <div>회차</div>
          <div>{part + 1}회차</div>
        </div>
        <Row marginTop="160px" justifyContent="center">
          <TabButton
            value="APP_SelectSeats"
            onClick={(e) => setTab(e.target.value)}
          >
            다음단계
          </TabButton>
        </Row>
      </div>
    </div>
  );
};

const SelectInfo = styled('div')`
  width: 900px;
  display: flex;
  background-color: #d9d9d915;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  algin-self: flex-start;
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
