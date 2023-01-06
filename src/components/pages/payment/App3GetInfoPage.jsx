import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { Row } from '@atoms/wrapper.style';
import { TabButton } from '@styles/ApaymentStyles';
import useOauth from '@hooks/useOauth';
import { tInfoState, sbtInfoState } from '@states/paymentState';
import { userState } from '@states/userState';
import { StepBox, LeftBox, RightBox } from './App1Start';
import TicketInfo from './TicketInfo';
import OrdererInfo from './OrdererInfo';
import SelectPayment from './SelectPayment';
import useMint from '@hooks/useMint';
import { payCardByTossPayment, payTransferByTossPayment } from '@utils/toss';
import PreTicketingModal from '@components/articles/PreTicketingModal';
import PreTicketingPeriod from '@utils/PreTicketingPeriod';
import PreTicketingCustomModal from '@components/articles/PreTicketingCustomModal';
import useItems from '@hooks/useItems';
import PreTicketingInactiveModal from '@components/articles/PreTicketingInactiveModal';

const App3GetInfoPage = ({ setTab, data }) => {
  const { email: userEmail, setPopup, popup } = useOauth();
  const { createTokenUri, createSBT } = useMint();

  const [payType, setPayType] = useState('');
  const [cashPayType, setCashPayType] = useState('easyPay');
  const [isLoading, setIsLoading] = useState(false); // 로딩중 확인
  const [preTicketModal, setPreTicketModal] = useState(false);

  const { account } = useRecoilValue(userState);
  const ticketInfo = useRecoilValue(tInfoState);
  const sbtInfo = useRecoilValue(sbtInfoState);

  const { preList } = useItems();

  const handlePayType = (e) => setPayType(e.target.value);
  const handleCashPayType = (e) => setCashPayType(e.target.value);

  //TODO: 다시 이페이지로 못들어오게 블라킹 해줘야 할거 같은데
  //TODO: 실패시 추가 처리 여부 고민
  const mint = async (e, _sbtInfo, _ticketInfo, _email) => {
    setIsLoading(true);
    try {
      const tokenUri = await createTokenUri(_sbtInfo, _email);
      await createSBT(tokenUri, _ticketInfo, 'COIN');
      setTab(e.target.value);
    } catch (error) {
      console.log('Error uploading file: ', error);
      toast.error('민팅 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const preMint = async (e, _sbtInfo, _ticketInfo, _email) => {
    setIsLoading(true);
    try {
      const tokenUri = await createTokenUri(_sbtInfo, _email);
      await createSBT(tokenUri, _ticketInfo, 'COIN');
      setTab(e.target.value);
    } catch (error) {
      console.log('Error uploading file: ', error);
      toast.error('민팅 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const onClickPay = (e) => {
    if (payType === 'cash' && cashPayType === 'easyPay') {
      localStorage.setItem('pay_data', JSON.stringify({ ticketInfo, sbtInfo }));
      payCardByTossPayment(ticketInfo.tPrice, data.title, account, data.id);
    } else if (payType === 'cash' && cashPayType === 'transfer') {
      localStorage.setItem('pay_data', JSON.stringify({ ticketInfo, sbtInfo }));
      payTransferByTossPayment(ticketInfo.tPrice, data.title, account, data.id);
    } else if (payType === 'coin') {
      console.log('PreTicketingPeriod:', PreTicketingPeriod(data.preTicketing));
      console.log('data.id :', data.id);
      console.log('includes:', preList.includes(data.id));
      console.log('preList :', preList[0]);
      if (PreTicketingPeriod(data.preTicketing) && preList.includes(data)) {
        setPreTicketModal(true);
      } else {
        mint(e, sbtInfo, ticketInfo, userEmail);
      }
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
          <Row marginTop="50px" justifyContent="center">
            <TabButton value="APP_SelectSeats" onClick={(e) => setTab(e.target.value)}>
              뒤로가기
            </TabButton>
            <TabButton value="APP_Done" onClick={onClickPay} disabled={!userEmail || !payType}>
              결제
            </TabButton>
          </Row>
        </RightBox>
      </StepBox>
      <PreTicketingCustomModal show={preTicketModal} toggleModal={() => setPreTicketModal(false)}>
        <PreTicketingInactiveModal setPreTicketModal={setPreTicketModal} hostAddr={data.id} />
      </PreTicketingCustomModal>
    </>
  );
};

export default App3GetInfoPage;
