import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TabButton } from '@styles/ApaymentStyles';
import { Row } from '@components/atoms/wrapper.style';
import MainStage from '../paymentSeat/MainStage';
import {
  myAPPStep,
  tPriceState,
  tPricePerTokenState,
  tTokenPriceState,
} from '@states/paymentState';
import { StepBox, LeftBox, RightBox } from './App1Start';
import TicketInfo from './TicketInfo';
import axios from 'axios';
import useMyTickets from '@hooks/useMyTickets';
import PreTicketingCustomModal from '@components/articles/PreTicketingCustomModal';
import PreTicketingInactiveModal from '@components/articles/PreTicketingInactiveModal';
import PreTicketingPeriod from '@utils/PreTicketingPeriod';

export const App2SelectSeats = ({ data, inactiveId, setInactiveId }) => {
  const price = useRecoilValue(tPriceState);
  const setPricePerToken = useSetRecoilState(tPricePerTokenState);
  const setTokenPrice = useSetRecoilState(tTokenPriceState);
  const setTab = useSetRecoilState(myAPPStep);

  const [preTicketModal, setPreTicketModal] = useState(false);
  const sbtList = useMyTickets();

  // 실시간 토큰 가격 저장
  useEffect(() => {
    async function fetchPolygonPrice() {
      let result = await axios('https://api.coinpaprika.com/v1/tickers?quotes=KRW');
      result = result.data.slice(0, 25);
      result = result.filter((token) => token.id === 'matic-polygon');
      result = result[0].quotes['KRW'].price;
      setPricePerToken(result);
      setTokenPrice(price / result);
    }
    fetchPolygonPrice();
  }, [price, setPricePerToken, setTokenPrice]);

  return (
    <>
      <StepBox>
        <LeftBox>
          <MainStage data={data} />
        </LeftBox>
        <RightBox>
          <TicketInfo data={data} inactiveId={inactiveId} />
          <Row justifyContent="center" marginTop="50px">
            <TabButton value="APP_Start" onClick={(e) => setTab(e.target.value)}>
              뒤로가기
            </TabButton>
            <TabButton
              value="APP_GetInfo"
              onClick={(e) => {
                if (PreTicketingPeriod(data.preTicketing) === '진행중' && !inactiveId) {
                  setPreTicketModal(true);
                } else {
                  setTab(e.target.value);
                }
              }}
              disabled={price === 0}
            >
              다음단계
            </TabButton>
          </Row>
        </RightBox>
      </StepBox>
      {sbtList.length && (
        <PreTicketingCustomModal show={preTicketModal} toggleModal={() => setPreTicketModal(false)}>
          <PreTicketingInactiveModal
            setPreTicketModal={setPreTicketModal}
            hostAddr={data.id}
            sbtList={sbtList}
            inactiveId={inactiveId}
            setInactiveId={setInactiveId}
          />
        </PreTicketingCustomModal>
      )}
    </>
  );
};
