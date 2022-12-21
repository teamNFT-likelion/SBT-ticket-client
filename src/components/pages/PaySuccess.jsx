import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import useOauth from '@hooks/useOauth';
import useMint from '@hooks/useMint';
import Layout from '@articles/Layout';
import { useRecoilValue } from 'recoil';
import { web3State } from '@states/userState';

const PaySuccess = () => {
  const { email: userEmail } = useOauth();
  // const web3 = useRecoilValue(web3State);
  // const { createTokenUri, createSBT } = useMint(web3);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('PAYING');
  const { data, ticketInfo, sbtInfo } = JSON.parse(
    localStorage.getItem('pay_data'),
  );

  const paymentKey = params.get('paymentKey');
  const orderId = params.get('orderId');
  const amount = params.get('amount');

  const mint = async () => {
    try {
      setStatus('MINTING');
      // const tokenUri = await createTokenUri(sbtInfo, userEmail);
      // await createSBT(tokenUri, ticketInfo);
      navigate(`/payment?id=${data.id}`, {
        state: {
          tab: 'APP_Done',
          payedData: { ticketInfo, sbtInfo },
        },
      });
    } catch (error) {
      console.log('Error uploading file: ', error);
      toast.error('민팅 실패');
      // TODO: 결제 취소 해줘야됨
      navigate(`/payment?id=${data.id}`, {
        state: {
          tab: 'APP_GetInfo',
        },
      });
    } finally {
      setStatus('');
    }
  };

  useEffect(() => {
    if (paymentKey && orderId && amount) {
      console.log(1);
      axios
        .get('http://localhost:5000/payment/success', {
          params: {
            paymentKey,
            orderId,
            amount,
          },
        })
        .then((res) => {
          setStatus('PAYED');
          mint();
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <Layout>
      {status === 'PAYING' && <div>결제승인 대기중...</div>}
      {status === 'PAYED' && <div>결제승인 완료...</div>}
      {status === 'MINTING' && <div>민팅중 ...</div>}
    </Layout>
  );
};

export default PaySuccess;
