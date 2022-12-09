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
} from '@styles/ApaymentStyles';
import { kakaoOauthUrl, naverOauthUrl } from '@constants/urlConst';
import useOauth from '@hooks/useOauth';
import kakaoLoginApiImg from '@assets/icon/kakaoLoginApiImg.png';
import naverLoginApiImg from '@assets/icon/naverLoginApiImg.png';
import kginicisImg from '@assets/img/kginicis.jpg';
import ethereumImage from '@assets/icon/ethereum.svg';
import polygonImage from '@assets/icon/polygon.svg';
import RowIcon from '@assets/icon/rowIcon(Right).png';
import CustomModal from '@components/articles/CustomModal';
import { getCookie } from '@utils/cookie';
import LoadingSpinner from '@atoms/LoadingSpinner';
import { tInfoState, sbtInfoState } from '@states/paymentState';
import { userState } from '@states/userState';
import useWeb3 from '@hooks/useWeb3';
import { walletConnectError, missingEmailError } from '@utils/toastMessages';

const App3GetInfoPage = () => {
  const navigate = useNavigate();
  const dataId = getCookie('dataId');
  const { email: userEmail } = useOauth();
  const { createTokenUri, createSBT, network, balance } = useWeb3();
  const { address } = useRecoilValue(userState);

  // 모달을 위한 state
  const [showUseKginicis, setShowUseKginicis] = useState(false);

  const ticketInfo = useRecoilValue(tInfoState);
  const sbtInfo = useRecoilValue(sbtInfoState);

  // 로딩중 확인
  const [isMint, setIsMint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!address) {
      walletConnectError();
      navigate('/list');
    }
  }, [navigate, address]);

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

  // 결제완료 후 자동 탭 이동 (개발단계라서 편의상 주석처리 해놓을게요)
  // function afterMinting() {
  //   navigate(`/payment?id=${dataId}`, {
  //     state: { tab: 'APP_Done', ticketInfo: ticketInfo },
  //   });
  // }

  return (
    <Layout page="a-payment-page">
      <Container>
        <PageTitle>티켓 결제</PageTitle>
        <SubTitle>| 정보 입력 |</SubTitle>
        <Row marginBottom="100px">
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
          <UserInfoWrapper>
            당신의 e-mail <p>{userEmail || 'Log in, please.'}</p>
          </UserInfoWrapper>
        </Row>
        <SubTitle>| 결제 수단 선택 |</SubTitle>
        {network === 'main' || network === 'goerli' ? (
          <MyBalanceWrapper>
            <p>My Balance: </p>
            <ImageWrapper src={ethereumImage} />
            <p>{`${balance} ETHER`}</p>
          </MyBalanceWrapper>
        ) : (
          <MyBalanceWrapper>
            <p>My Balance: </p>
            <ImageWrapper src={polygonImage} />
            <p>{`${balance} MATIC`}</p>
          </MyBalanceWrapper>
        )}
        <ReCAPTCHAWrapper>
          <ReCAPTCHA
            sitekey={'6Lf2GEUjAAAAAI0WtrRYHEacUJrsrssZN-qA_H35'}
            onChange={onChange}
          />
        </ReCAPTCHAWrapper>
        <Row marginTop={'25px'}>
          <TabButton
            value="byKginicis"
            onClick={() => setShowUseKginicis(true)}
          >
            일반결제
          </TabButton>
          <TabButton
            value="byCoin"
            onClick={() => {
              if (userEmail) {
                mint(sbtInfo, ticketInfo, userEmail);
              } else {
                missingEmailError();
              }
            }}
          >
            코인결제
          </TabButton>
        </Row>

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
            다음단계
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

const LoginImageWrapper = styled('img')`
  cursor: pointer;
  object-fit: contain;
  width: 183px;
  height: 50px;
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
  margin: 25px 0;
`;

const MyBalanceWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  margin: 20px 0;
`;

const ImageWrapper = styled('img')`
  width: 28px;
  height: 28px;
  border-radius: 15px;
  object-fit: contain;
  margin: 0 10px;
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
