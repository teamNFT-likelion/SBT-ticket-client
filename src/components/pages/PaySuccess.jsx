import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import useOauth from '@hooks/useOauth';
import useMint from '@hooks/useMint';
import useWeb3 from '@hooks/useWeb3';
import { StepBox, LeftBox, RightBox } from '@pages/payment/App1Start';
import TicketInfo from '@pages/payment/TicketInfo';
import { Row } from '@atoms/wrapper.style';
import { TabButton } from '@styles/ApaymentStyles';
import { myAPPStep, tDateState, tPartState, tSeatState, tPriceState } from '@states/paymentState';
import PayProgress from './payment/PayProgress';

const PaySuccess = () => {
  const { web3 } = useWeb3();
  const { data } = useOutletContext();
  const { email: userEmail } = useOauth();
  const { createTokenUri, createSBT } = useMint();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const paymentKey = params.get('paymentKey');
  const orderId = params.get('orderId');
  const amount = params.get('amount');
  const inactiveId = Number(params.get('inactiveId'));

  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelInfo, setCancelInfo] = useState('');

  const setTab = useSetRecoilState(myAPPStep);
  const setDate = useSetRecoilState(tDateState);
  const setPart = useSetRecoilState(tPartState);
  const setSeat = useSetRecoilState(tSeatState);
  const setPrice = useSetRecoilState(tPriceState);

  const { ticketInfo, sbtInfo } = JSON.parse(localStorage.getItem('pay_data'));
  const isMintAvailable = paymentKey && orderId && amount && Object.keys(web3).length > 0;

  useEffect(() => {
    console.log(inactiveId);
    const mint = async () => {
      try {
        const tokenUri = await createTokenUri(sbtInfo, userEmail);
        await createSBT(tokenUri, ticketInfo, 'CASH', inactiveId);
        setTab('APP_Done');
        navigate(`/payment?id=${data.id}`, {
          state: {
            payedData: { ticketInfo, sbtInfo },
          },
        });
        localStorage.removeItem('pay_data');
      } catch (error) {
        console.error(error);
        toast.error('민팅 실패');
        setStatus(4);
        axios
          .get('https://ttot.tk/payment/cancel', {
            params: {
              paymentKey,
              cancelReason: '민트 실패에 의한 결제취소',
            },
          })
          .then((res) => {
            setStatus(5);
            setCancelInfo(res.data.data.cancels[0]);
          })
          .catch((err) => console.log(err));
      } finally {
        setIsLoading(false);
      }
    };

    if (isMintAvailable) {
      setStatus(1);
      axios
        .get('https://ttot.tk/payment/success', {
          params: {
            paymentKey,
            orderId,
            amount,
          },
        })
        .then((res) => {
          setStatus(2);
          mint();
        })
        .catch((err) => {
          console.log(err);
          toast.error('결제 승인 취소');
          navigate('/list');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMintAvailable]);

  useEffect(() => {
    console.log(ticketInfo, 'CASH', inactiveId);
    console.log(sbtInfo);
    setDate(new Date(ticketInfo.tDate));
    setPart(ticketInfo.tPart);
    setSeat(ticketInfo.tSeat);
    setPrice(ticketInfo.tPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StepBox>
      <LeftBox>
        <PayProgress status={status} cancelInfo={cancelInfo} />
      </LeftBox>
      <RightBox>
        <TicketInfo data={data} isLoading={isLoading} inactiveId={inactiveId} />
        <Row marginTop="100px" justifyContent="center">
          {!isLoading && (
            <TabButton value="APP_SelectSeats" onClick={() => navigate('/list')}>
              취소
            </TabButton>
          )}
        </Row>
      </RightBox>
    </StepBox>
  );
};

export default PaySuccess;
