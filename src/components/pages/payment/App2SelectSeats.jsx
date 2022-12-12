import React, {useState} from 'react';
import { PageTitle, SubTitle, TabButton } from '@styles/ApaymentStyles';
import { Row } from '@components/atoms/wrapper.style';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '@utils/cookie';
import MainStage from '../paymentSeat/MainStage';
import { tSeatState, tPriceState } from '@states/paymentState';
import { useSetRecoilState } from 'recoil';

export const App2SelectSeats = ({ setTab, dataId }) => {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState(0);

  const setSeat = useSetRecoilState(tSeatState);
  const setPrice = useSetRecoilState(tPriceState);

  return (
    <>
      <PageTitle>티켓 결제</PageTitle>
      <SubTitle>| 좌석 선택 |</SubTitle>
      <MainStage
        setSelectedSeats={setSelectedSeats}
        setSelectedPrices={setSelectedPrices}
      />
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
            setSeat(selectedSeats);
            setPrice(selectedPrices);
          }}
          disabled={selectedPrices === 0 ? true : false}
        >
          다음단계
        </TabButton>
      </Row>
    </>
  );
};
