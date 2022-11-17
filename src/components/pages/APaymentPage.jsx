import React, { useEffect } from 'react';
import Header from '@articles/Header';
import axios from 'axios';
import { TempWrapper } from '@atoms/wrapper.style';
import { naverOauthUrl } from '@constants/urlConst';
import { getCookie } from '@utils/cookie';

const APaymentPage = () => {
  const oauthData = getCookie('oauthData');
  const onClick = async () => {
    const res = await axios.get('http://localhost:5000/test');
    console.log(res.data);
  };

  useEffect(() => {
    console.log(oauthData);
  }, [oauthData]);

  return (
    <TempWrapper>
      <div>결제페이지~</div>
      <Header />
      결제 1단계...
      <button
        style={{
          border: '2px solid green',
          color: 'green',
          backgroundColor: 'white',
          width: '300px',
          height: '100px',
          fontSize: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={onClick}
      >
        api테스트
      </button>
      <button
        style={{
          border: '2px solid #fae54d',
          color: '#fae54d',
          backgroundColor: '#3b1f1e',
          width: '300px',
          height: '100px',
          fontSize: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={onClick}
      >
        Kakao 테스트
      </button>
      <a
        style={{
          border: '2px solid green',
          color: 'green',
          backgroundColor: 'white',
          width: '300px',
          height: '100px',
          fontSize: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        href={naverOauthUrl}
      >
        네이버 테스트
      </a>
    </TempWrapper>
  );
};

export default APaymentPage;
