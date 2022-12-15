import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import styled from 'styled-components';
import Layout from '@articles/Layout';
import * as colors from '@styles/colors';
import { Column, Row } from '@components/atoms/wrapper.style';
import {
  Container,
  PageTitle,
  SubTitle,
  TabButton,
  SmTabButton,
} from '@styles/ApaymentStyles';
import { kakaoOauthUrl, naverOauthUrl } from '@constants/urlConst';
import useOauth from '@hooks/useOauth';
import kakaoIcon from '@assets/icon/kakaoIcon.png';
import naverIcon from '@assets/icon/naverIcon.png';
import kginicisImg from '@assets/img/kginicis.jpg';

import RowIcon from '@assets/icon/rowIcon(Right).png';
import CustomModal from '@components/articles/CustomModal';
import { getCookie } from '@utils/cookie';
import LoadingSpinner from '@atoms/LoadingSpinner';
import { tInfoState, sbtInfoState } from '@states/paymentState';
import { userState } from '@states/userState';
import useWeb3 from '@hooks/useWeb3';
import { walletConnectError, missingEmailError } from '@utils/toastMessages';
import AppStepHeader from './AppStepHeader';
import MyBalance from '@articles/MyBalance';

const App3GetInfoPage = () => {
  const navigate = useNavigate();
  const dataId = getCookie('dataId');
  const { email: userEmail } = useOauth();
  const { createTokenUri, createSBT, network, balance } = useWeb3();
  const { address } = useRecoilValue(userState);

  // 모달을 위한 state
  const [showUseKginicis, setShowUseKginicis] = useState(false);
  const [payType, setPayType] = useState('');
  const [cashPayType, setCashPayType] = useState('');

  const ticketInfo = useRecoilValue(tInfoState);
  const sbtInfo = useRecoilValue(sbtInfoState);

  // 로딩중 확인
  const [isMint, setIsMint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mint = async (_sbtInfo, _ticketInfo, _email) => {
    setIsLoading(true);
    try {
      const tokenUri = await createTokenUri(_sbtInfo, _email);
      await createSBT(tokenUri, _ticketInfo);
      setIsMint(true);
    } catch (error) {
      console.log('Error uploading file: ', error);
      toast.error('민팅 실패');
      setIsMint(false);
    } finally {
      setIsLoading(false);
    }
  };

  function onChange(value) {
    // console.log('Captcah value:', value);
  }

  function backToPaymemt(e) {
    navigate(`/payment?id=${dataId}`, {
      state: { tab: e.target.value },
    });
  }

  const handlePayType = (e) => setPayType(e.target.value);
  const handleCashPayType = (e) => setCashPayType(e.target.value);

  useEffect(() => {
    if (!address) {
      walletConnectError();
      navigate('/list');
    }
  }, [navigate, address]);

  // 결제완료 후 자동 탭 이동 (개발단계라서 편의상 주석처리 해놓을게요)
  // function afterMinting() {
  //   navigate(`/payment?id=${dataId}`, {
  //     state: { tab: 'APP_Done', ticketInfo: ticketInfo },
  //   });
  // }

  return (
    <Layout page="a-payment-page">
      <AppStepHeader step="APP_Pay" />
      <Container>
        <div
          style={{ border: '2px solid orange', display: 'flex', width: '100%' }}
        >
          <div style={{ border: '2px solid orange', flex: 2.5 }}>
            <Column gap="12px">
              <SubTitle>| 주문자 정보 |</SubTitle>
              <Row alignItems="center">
                <Label htmlFor="address">지갑주소</Label>
                <Input
                  id="address"
                  type="text"
                  value={address}
                  placeholder="지갑주소를 불러오세요"
                  autoComplete="off"
                />
              </Row>
              <Row alignItems="center">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="text"
                  value={userEmail}
                  autoComplete="off"
                  placeholder="이메일 정보를 불러오세요"
                />
                <IconWrapper
                  src={kakaoIcon}
                  onClick={() => {
                    window.location.href = kakaoOauthUrl;
                  }}
                />
                <IconWrapper
                  src={naverIcon}
                  onClick={() => {
                    window.location.href = naverOauthUrl;
                  }}
                />
              </Row>
              {/* <UserInfoWrapper>
                당신의 e-mail <p>{userEmail || 'Log in, please.'}</p>
              </UserInfoWrapper> */}
            </Column>
            <Column>
              <SubTitle>| 결제수단 선택 |</SubTitle>
              <Row>
                <SmTabButton
                  value="coin"
                  onClick={handlePayType}
                  isActive={payType === 'coin'}
                  // onClick={() => {
                  //   if (userEmail) {
                  //     mint(sbtInfo, ticketInfo, userEmail);
                  //   } else {
                  //     missingEmailError();
                  //   }
                  // }}
                >
                  코인결제
                </SmTabButton>
                <SmTabButton
                  value="cash"
                  onClick={handlePayType}
                  isActive={payType === 'cash'}
                  // onClick={() => setShowUseKginicis(true)}
                >
                  일반결제
                </SmTabButton>
              </Row>
              <Column>
                {payType === 'coin' && <MyBalance />}
                {payType === 'cash' && (
                  <Row>
                    <SmTabButton
                      value="transfer"
                      onClick={handleCashPayType}
                      isActive={cashPayType === 'transfer'}
                    >
                      계좌이체
                    </SmTabButton>
                    <SmTabButton
                      value="easyPay"
                      onClick={handleCashPayType}
                      isActive={cashPayType === 'easyPay'}
                    >
                      간편결제
                    </SmTabButton>
                  </Row>
                )}
                {/* <ReCAPTCHAWrapper>
                  <ReCAPTCHA
                    sitekey={'6Lf2GEUjAAAAAI0WtrRYHEacUJrsrssZN-qA_H35'}
                    onChange={onChange}
                  />
                </ReCAPTCHAWrapper> */}
              </Column>
            </Column>
          </div>
          <Column style={{ border: '2px solid orange', flex: 1 }}>asdf</Column>
        </div>
        <Row>
          {isMint && (
            <CompletedContainer>Completed Create!!</CompletedContainer>
          )}
          {/* {isMint &&
            setTimeout(() => {
              afterMinting();
            }, 5000)} */}
          {isLoading && (
            <CompletedContainer>
              <LoadingSpinner />
            </CompletedContainer>
          )}
        </Row>
        <Row marginTop={'25px'}>
          <TabButton value="APP_SelectSeats" onClick={backToPaymemt}>
            뒤로가기
          </TabButton>
          <TabButton value="APP_Done" onClick={backToPaymemt}>
            결제
          </TabButton>
        </Row>
      </Container>

      <CustomModal
        show={showUseKginicis}
        toggleModal={() => setShowUseKginicis(false)}
      >
        <img src={kginicisImg} alt="견본용" />
      </CustomModal>
    </Layout>
  );
};

const IconWrapper = styled('img')`
  cursor: pointer;
  object-fit: contain;
  width: auto;
  height: 40px;
  margin-right: 8px;
`;

const UserInfoWrapper = styled(Column)`
  color: #ffffff;
  margin-top: 30px;
  width: 183px;
  height: 95px;
  text-align: center;
  justify-content: space-around;
  align-items: center;
  border: 3px solid;
  border-radius: 10px;

  & > p {
    color: ${colors.natural95};
    font-size: 15px;
  }
`;

const ReCAPTCHAWrapper = styled('div')`
  // margin: 25px 0;
`;

const Label = styled('label')`
  min-width: 100px;
  font-size: 20px;
`;
const Input = styled('input')`
  height: 40px;
  width: 400px;
  border-radius: 5px;
  border: none;
  outline: none;
  padding-left: 12px;
  margin-right: 20px;
`;

const CompletedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px 0;
  font-weight: 600;
  font-size: 34px;
`;

export default App3GetInfoPage;
