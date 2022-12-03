import React, { useState } from 'react';
import Layout from '@articles/Layout';
import { Column, Row } from '@components/atoms/wrapper.style';
import {
  Container,
  PageTitle,
  SubTitle,
  TabButton,
} from '@styles/ApaymentStyles';
import { useNavigate } from 'react-router-dom';
import { kakaoOauthUrl, naverOauthUrl } from '@constants/urlConst';
import ReCAPTCHA from 'react-google-recaptcha';
import useOauth from '@hooks/useOauth';
import styled from 'styled-components';
import kakaoLoginApiImg from '@assets/icon/kakaoLoginApiImg.png';
import naverLoginApiImg from '@assets/icon/naverLoginApiImg.png';
import kginicisImg from '@assets/img/kginicis.jpg';
import RowIcon from '@assets/icon/rowIcon(Right).png';
import CustomModal from '@components/articles/CustomModal';
import { getCookie } from '@utils/cookie';

const LoginImageWrapper = styled('img')`
  cursor: pointer;
  object-fit: contain;
  width: 183px;
  height: 50px;
`;

const UserInfoWrapper = styled(Column)`
  background-color: white;
  color: black;
  margin-top: 30px;
  width: 183px;
  height: 90px;
`;

function onChange(value) {
  console.log('Captcah value:', value);
}

function getUserEmail(userData) {
  const email = userData && (userData.email || userData.kakao_account.email);
  return email;
}

const App3GetInfoPage = () => {
  // tap 키 저장 state
  const navigate = useNavigate();
  const dataId = getCookie('dataId');

  // 모달을 위한 state
  const [showUseKginicis, setShowUseKginicis] = useState(false);
  const userData = useOauth();

  function backToPaymemt(e) {
    navigate(`/payment?id=${dataId}`, {
      state: { tab: e.target.value },
    });
  }

  return (
    <Layout page="a-payment-page">
      <Container>
        <PageTitle>티켓 결제</PageTitle>
        <SubTitle>| 정보 입력 및 결제 |</SubTitle>
        <Row marginBottom="40px">
          <Column marginTop="24px">
            <LoginImageWrapper
              src={kakaoLoginApiImg}
              onClick={() => {
                window.location.href = kakaoOauthUrl;
              }}
            />
            <LoginImageWrapper
              src={naverLoginApiImg}
              onClick={() => {
                window.location.href = naverOauthUrl;
              }}
            />
          </Column>
          <Column
            alignItems={'center'}
            justifyContent={'center'}
            width={'183px'}
            height={'100px'}
            marginTop={'24px'}
          >
            <img
              src={RowIcon}
              alt="화살표"
              style={{
                height: '80px',
                width: '80px',
                objectFit: 'contain',
                margin: '10px',
              }}
            />
          </Column>
          <UserInfoWrapper>{getUserEmail(userData)}</UserInfoWrapper>
        </Row>
        <ReCAPTCHA
          sitekey={'6Lf2GEUjAAAAAI0WtrRYHEacUJrsrssZN-qA_H35'}
          onChange={onChange}
        />
        <SubTitle>| 결제 수단을 선택해주세요. |</SubTitle>
        <Row marginBottom={'50px'} marginTop={'24px'}>
          <TabButton
            value="byKginicis"
            onClick={(newTab) => {
              setShowUseKginicis(true);
            }}
          >
            일반결제
          </TabButton>
          <TabButton
            value="byCoin"
            onClick={(newTab) => {
              // setTab(newTab.target.value);
            }}
          >
            코인결제
          </TabButton>

          <CustomModal
            show={showUseKginicis}
            toggleModal={() => setShowUseKginicis(false)}
          >
            <img src={kginicisImg} alt="견본용" />
          </CustomModal>
        </Row>

        <Row>
          <TabButton
            value="APP_Start"
            onClick={(e) => {
              backToPaymemt(e);
            }}
          >
            뒤로가기
          </TabButton>
          <TabButton
            value="APP_Done"
            onClick={(e) => {
              backToPaymemt(e);
            }}
          >
            다음단계
          </TabButton>
        </Row>
      </Container>
    </Layout>
  );
};

export default App3GetInfoPage;
