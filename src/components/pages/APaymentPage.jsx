import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '@articles/Layout';
import { setCookie, getCookie } from '@utils/cookie';
import { kakaoOauthUrl, naverOauthUrl } from '@constants/urlConst';

const APaymentPage = () => {
  const navigate = useNavigate();
  const oauthData = getCookie('oauthData');

  const params = new URL(window.location).searchParams;
  const code = params.get('code');
  const state = params.get('state');

  useEffect(() => {
    // 인가코드 서버에 전달 및 프로필데이터 응답처리
    const getOauthData = (_state, _code) => {
      axios
        .get(
          `https://ec2-13-114-237-105.ap-northeast-1.compute.amazonaws.com:5000/${_state}/callback`,
          {
            params: {
              code: _code,
            },
          },
        )
        .then(({ data }) => {
          setCookie('oauthData', data.data, {
            expires: new Date(Date.now() + 1000 * 60 * 5),
          });
          navigate('/payment');
        })
        .catch((err) => {
          console.error(err);
          navigate('/payment');
        });
    };

    // 리다이렉트uri 로 인가코드 받았으면 서버로 전달
    if (state && code) {
      getOauthData(state, code);
    }
  }, [code, state, navigate]);

  // 임시 데이터 확인용 effect
  useEffect(() => {
    if (oauthData) {
      console.log(oauthData);
    }
  }, [oauthData]);

  return (
    <Layout>
      결제 1단계...
      <a
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
        href={kakaoOauthUrl}
      >
        Kakao 테스트
      </a>
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
    </Layout>
  );
};

export default APaymentPage;
