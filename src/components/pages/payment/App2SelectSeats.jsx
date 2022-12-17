import React from 'react';
import { useRecoilValue } from 'recoil';
import { TabButton } from '@styles/ApaymentStyles';
import { Row } from '@components/atoms/wrapper.style';
import MainStage from '../paymentSeat/MainStage';
import { tPriceState } from '@states/paymentState';
import { StepBox, LeftBox, RightBox } from './App1Start';
import TicketInfo from './TicketInfo';

export const App2SelectSeats = ({ setTab, data }) => {
  const price = useRecoilValue(tPriceState);

  return (
    <StepBox>
      <LeftBox>
        <MainStage />
      </LeftBox>
      <RightBox>
        <TicketInfo data={data} />
        <Row justifyContent="center" marginTop="100px">
          <TabButton value="APP_Start" onClick={(e) => setTab(e.target.value)}>
            뒤로가기
          </TabButton>
          <TabButton
            value="APP_GetInfo"
            onClick={(e) => setTab(e.target.value)}
            disabled={price === 0}
          >
            다음단계
          </TabButton>
        </Row>
      </RightBox>
    </StepBox>
  );
};
