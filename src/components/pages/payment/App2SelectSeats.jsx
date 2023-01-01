import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TabButton } from '@styles/ApaymentStyles';
import { Row } from '@components/atoms/wrapper.style';
import MainStage from '../paymentSeat/MainStage';
import { tPriceState, tPricePerTokenState, tTokenPriceState } from '@states/paymentState';
import { StepBox, LeftBox, RightBox } from './App1Start';
import TicketInfo from './TicketInfo';
import axios from 'axios';

export const App2SelectSeats = ({ setTab, data }) => {
  const price = useRecoilValue(tPriceState);
  const setPricePerToken = useSetRecoilState(tPricePerTokenState);
  const setTokenPrice = useSetRecoilState(tTokenPriceState);

  // 실시간 토큰 가격 저장
  useEffect(() => {
    async function fetchPolygonPrice() {
      let result = await axios('https://api.coinpaprika.com/v1/tickers?quotes=KRW');
      result = result.data.slice(0, 25);
      result = result.filter((token) => token.id === 'matic-polygon');
      result = result[0].quotes['KRW'].price;
      setPricePerToken(result);
      setTokenPrice(price / result);
      console.log(`tokenPerPrice: ${result}`);
      console.log(price / result);
    }
    fetchPolygonPrice();
  }, [price]);

  return (
    <StepBox>
      <LeftBox>
        <MainStage />
      </LeftBox>
      <RightBox>
        <TicketInfo data={data} />
        <Row justifyContent="center" marginTop="70px">
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
