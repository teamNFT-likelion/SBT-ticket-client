import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setCookie, getCookie } from '@utils/cookie';


export default function useOauth(){
  const navigate = useNavigate();
  const params = new URL(window.location).searchParams; //TODO: 이거 react-router-dom hook 있음 리팩토링필요

  const state = params.get('state');
  const code = params.get('code');

  const oauthData = getCookie('oauthData');

  useEffect(() => {
    // 인가코드 서버에 전달 및 프로필데이터 응답처리
    const getOauthData = (_state, _code) => {
      axios
        .get(`https://ttot.tk/${_state}/callback`, {
          params: {
            code: _code,
          },
        })
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

  return oauthData;
}