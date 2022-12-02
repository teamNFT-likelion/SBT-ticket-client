import React from 'react';
import { TabButton } from '@styles/ApaymentStyles';
import DetailInfo from '@components/atoms/DetailInfo';
import { Row } from '@components/atoms/wrapper.style';
import { Ticket } from '@components/articles/AAP-inactive';
import { DummyData } from '@components/pages/tempData/DummyData';
import { PageTitle, SubTitle } from '@styles/ApaymentStyles';

export const App1Start = ({ setTab, dataId }) => {
  return (
    <>
      <PageTitle>티켓 결제</PageTitle>
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
      </TabButton>
    </>
  );
};
