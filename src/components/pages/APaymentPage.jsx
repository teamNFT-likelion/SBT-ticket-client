import React, { useEffect } from 'react';
import * as colors from '@styles/colors';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import Layout from '@articles/Layout';
import { setCookie, getCookie } from '@utils/cookie';
import { kakaoOauthUrl, naverOauthUrl } from '@constants/urlConst';
import DetailInfo from '@components/atoms/DetailInfo';
import { Column } from '@components/atoms/wrapper.style';

const Container = styled(Column)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageTitle = styled('div')`
  font-size: 28px;
  margin-bottom: 30px;
  color: white;
`;
const SubTitle = styled(PageTitle)`
  font-size: 22px;
  margin-top: 30px;
  margin-bottom: 0px;
  color: ${colors.primary80};
`;

// const TabButton = styled('button')`
//   background-color: ${colors.primary40};
//   width: 15.6%;
//   height: 64px;
//   font-size: 20px;
//   cursor: pointer;
//   border-radius: 5px;
//   margin: 3px;
// `;

// const TempBox = styled(Column)`
//   height: 500px;
//   border: white 4px solid;
// `;


const APaymentPage = () => {
  const navigate = useNavigate();
  const oauthData = getCookie('oauthData');

  const params = new URL(window.location).searchParams; //TODO: 이거 react-router-dom hook 있음 리팩토링필요
  const state = params.get('state');
  const code = params.get('code');

  // tap 키 저장 state
  // const [tab, setTab] = useState('ALL');


// const AAP_1 = <TempBox>AAP_1 입니다~</TempBox>;
// const AAP_2 = <TempBox>AAP_2 입니다~</TempBox>;
// const AAP_3 = <TempBox>AAP_3 입니다~</TempBox>;

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

  return (
    <Layout page="a-payment-page">
      <Container>
        <PageTitle>티켓 결제</PageTitle>
        <SubTitle>| 선택한 공연 정보 |</SubTitle>
        <DetailInfo />
        {/* <TabButton
          value="예매"
          onClick={(newTab) => {
            setTab(newTab.target.value);
          }}
        >
          예매하기
        </TabButton> */}
      </Container>
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
    </Layout>
  );
};

export default APaymentPage;
