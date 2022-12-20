import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { Row } from '@components/atoms/wrapper.style';
import { TabButton } from '@styles/ApaymentStyles';
import useOauth from '@hooks/useOauth';
import kginicisImg from '@assets/img/kginicis.jpg';
import CustomModal from '@components/articles/CustomModal';
import { tInfoState, sbtInfoState } from '@states/paymentState';
import { userState } from '@states/userState';
import { StepBox, LeftBox, RightBox } from './App1Start';
import TicketInfo from './TicketInfo';
import OrdererInfo from './OrdererInfo';
import SelectPayment from './SelectPayment';
import useMint from '@hooks/useMint';

const App3GetInfoPage = ({ setTab, data }) => {
  const { email: userEmail, setPopup, popup } = useOauth();
  const { createTokenUri, createSBT } = useMint();

  const [payType, setPayType] = useState('');
  const [cashPayType, setCashPayType] = useState('');
  const [showUseKginicis, setShowUseKginicis] = useState(false); // 모달을 위한 state
  const [isLoading, setIsLoading] = useState(false); // 로딩중 확인

  const { account } = useRecoilValue(userState);
  const ticketInfo = useRecoilValue(tInfoState);
  const sbtInfo = useRecoilValue(sbtInfoState);

  const handlePayType = (e) => setPayType(e.target.value);
  const handleCashPayType = (e) => setCashPayType(e.target.value);

  const mint = async (e, _sbtInfo, _ticketInfo, _email) => {
    setIsLoading(true);
    try {
      const tokenUri = await createTokenUri(_sbtInfo, _email);
      await createSBT(tokenUri, _ticketInfo);
      setTab(e.target.value);
      //TODO: 다시 이페이지로 못들어오게 블라킹 해줘야 할거 같은데
    } catch (error) {
      console.log('Error uploading file: ', error);
      toast.error('민팅 실패');
      //TODO: 실패시 추가 처리 여부 고민
    } finally {
      setIsLoading(false);
    }
  };

  const onClickPay = (e) => {
    if (payType === 'cash') {
      setShowUseKginicis(true);
    } else if (payType === 'coin') {
      mint(e, sbtInfo, ticketInfo, userEmail);
    }
  };

  useEffect(() => {
    const receiveMessage = async (e) => {
      //TODO: oauth 데이터 저장 리팩토링고려, 에러시 처리 안된거 리팩토링, getInfo용 페이지 생성고려
      // console.log(e.data.oauthData);
      if (e.data.hasOwnProperty('oauthData')) {
        popup.close();
        setPopup(null);
      }
    };

    window.addEventListener('message', receiveMessage, false);
    return () => window.removeEventListener('message', receiveMessage);
  }, [popup, setPopup]);

  return (
    <>
      <StepBox>
        <LeftBox>
          <OrdererInfo address={account} setPopup={setPopup} />
          <SelectPayment
            onClickPayType={handlePayType}
            onClickCashPayType={handleCashPayType}
            payType={payType}
            cashPayType={cashPayType}
          />
        </LeftBox>
        <RightBox>
          <TicketInfo data={data} isLoading={isLoading} />
          <Row marginTop="100px" justifyContent="center">
            <TabButton
              value="APP_SelectSeats"
              onClick={(e) => setTab(e.target.value)}
            >
              뒤로가기
            </TabButton>
            <TabButton
              value="APP_Done"
              onClick={onClickPay}
              disabled={!userEmail || !payType}
            >
              결제
            </TabButton>
          </Row>
        </RightBox>
      </StepBox>

      <TabButton value="APP_Done" onClick={(e) => setTab(e.target.value)}>
        임시다음
      </TabButton>

      <CustomModal
        show={showUseKginicis}
        toggleModal={() => setShowUseKginicis(false)}
      >
        <img src={kginicisImg} alt="견본용" />
      </CustomModal>
    </>
  );
};

// 결제완료 후 자동 탭 이동 (개발단계라서 편의상 주석처리 해놓을게요)
// function afterMinting() {
//   navigate(`/payment?id=${dataId}`, {
//     state: { tab: 'APP_Done', ticketInfo: ticketInfo },
//   });
// }

export default App3GetInfoPage;
