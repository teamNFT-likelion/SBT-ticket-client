import React, { useState } from 'react';
import { PageTitle, SubTitle, TabButton } from '@styles/ApaymentStyles';
import styled from 'styled-components';
import { Column, Row } from '@components/atoms/wrapper.style';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '@utils/cookie';
import MainStage from '../paymentSeat/MainStage';

const SeatsSelectBox = styled(Column)`
  height: auto;
  width: 700px;
  border: white 4px solid;
`;

const SeatsInfoBox = styled(Column)`
  height: 50px;
  width: 700px;
  border: white 4px solid;
`;

export const App2SelectSeats = ({ setTab, dataId }) => {
  const navigate = useNavigate();

  return (
    <>
      <PageTitle>티켓 결제</PageTitle>
      <SubTitle>| 좌석 선택 |</SubTitle>
      <Column marginTop="24px" marginBottom="24px" height="auto">
        <SeatsInfoBox>좌석정보</SeatsInfoBox>
        <SeatsSelectBox>
          <MainStage
            onSelectSeat={(seatId) => {
              console.log('selected - ' + seatId);
            }}
          />
        </SeatsSelectBox>
      </Column>
      <Row>
        <TabButton
          value="APP_Start"
          onClick={(newTab) => {
            setTab(newTab.target.value);
          }}
        >
          뒤로가기
        </TabButton>
        <TabButton
          value="APP_GetInfo"
          onClick={(newTab) => {
            setTab(newTab.target.value);
            setCookie('dataId', dataId);
            navigate('/getInfo');
          }}
        >
          다음단계
        </TabButton>
      </Row>
    </>
  );
};
