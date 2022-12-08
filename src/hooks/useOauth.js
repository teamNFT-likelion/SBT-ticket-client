import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setCookie, getCookie } from '@utils/cookie';

export default function useOauth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const oauthData = getCookie('oauthData');
  const [params] = useSearchParams();

  const state = params.get('state');
  const code = params.get('code');

  function getUserEmail(userData) {
    return (userData && (userData.email || userData.kakao_account.email)) || '';
  }

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
          navigate('/getInfo');
        })
        .catch((err) => {
          console.error(err);
          navigate('/getInfo');
        });
    };

    // 리다이렉트uri 로 인가코드 받았으면 서버로 전달
    if (state && code) {
      getOauthData(state, code);
    }
  }, [code, state, navigate]);

  useEffect(() => {
    setEmail(getUserEmail(oauthData));
  }, [oauthData]);

  return { oauthData, email };
}
