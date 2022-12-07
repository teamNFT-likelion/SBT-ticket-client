/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef } from 'react';
import Layout from '@articles/Layout';
import * as colors from '@styles/colors';
import { Column, Row } from '@components/atoms/wrapper.style';
import {
  Container,
  PageTitle,
  SubTitle,
  TabButton,
} from '@styles/ApaymentStyles';
// import LoadingSpinner from '@atoms/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { kakaoOauthUrl, naverOauthUrl } from '@constants/urlConst';
import ReCAPTCHA from 'react-google-recaptcha';
import useOauth from '@hooks/useOauth';
import styled from 'styled-components';
import kakaoLoginApiImg from '@assets/icon/kakaoLoginApiImg.png';
import naverLoginApiImg from '@assets/icon/naverLoginApiImg.png';
import kginicisImg from '@assets/img/kginicis.jpg';
import ethereumImage from '@assets/icon/ethereum.svg';
import polygonImage from '@assets/icon/polygon.svg';
import RowIcon from '@assets/icon/rowIcon(Right).png';
import CustomModal from '@components/articles/CustomModal';
import { getCookie } from '@utils/cookie';
import Web3 from 'web3';
import { GOERLI_TTOT, NFTStorageAPI } from '@contracts/ContractAddress';
import { TTOT_ABI } from '@contracts/ABI';
import { NFTStorage, Blob } from 'nft.storage';
import LoadingSpinner from '@atoms/LoadingSpinner';

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

const ethereum = window.ethereum;

const App3GetInfoPage = () => {
  // tap 키 저장 state
  const navigate = useNavigate();
  const dataId = getCookie('dataId');

  // 모달을 위한 state
  const [showUseKginicis, setShowUseKginicis] = useState(false);
  const userData = useOauth();

  // 컨트랙트와 통신을 위한 객체 저장
  const [web3, setWeb3] = useState({});

  // 지금 로그인한 지갑 정보 저장 state
  const [account, setAccount] = useState('');
  const [walletType, setWalletType] = useState('');

  // 내 잔고 확인을 위한 state
  const [balance, setBalance] = useState(0);
  const [network, setNetwork] = useState('');

  // mintSBT에 필요한 state
  const [tokenUri, setTokenUri] = useState(''); // token에 URI 저장
  const [tokenDeadline, setTokenDeadline] = useState(0); // token에 deadline 저장
  const [tokenPrice, setTokenPrice] = useState(0); // token에 price 저장
  const [tokenPerformId, setTokenPerfromId] = useState(0); // token에 공연id 저장
  const [tokenSeat, setTokenSeat] = useState(''); // token에 좌석정보 저장
  const [tokenSeatLimit, setTokenSeatLimit] = useState(0); //token에 해당 공연의 총좌석수 저장

  // tokenUri => ipfs 메타데이터를 위한 state
  const [sbtImage, setSbtImage] = useState(null); // metadata 이미지 경로 저장
  const [sbtName, setSbtName] = useState(''); // metadata 이름 저장
  const [sbtDesc, setSbtDesc] = useState(''); // metadata 본문 저장
  const [userEmail, setUserEmail] = useState(''); // metadata 이메일 저장

  // 로딩중 확인
  const [isMint, setIsMint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // NFTStorage 사용을 위해 객체 생성
  const client = new NFTStorage({ token: NFTStorageAPI });

  // account와 walletType 불러오기
  useEffect(() => {
    setAccount(localStorage.getItem('_user'));
    setWalletType(localStorage.getItem('_wallet'));
  }, []);

  // 시작 시 메타마스크와 연결이 되어있는 지 확인하고 객체를 생성.
  useEffect(() => {
    if (typeof ethereum !== 'undefined') {
      try {
        const web3 = new Web3(ethereum);
        setWeb3(web3);
      } catch (err) {
        console.log(err);
      }
    } else return;
  }, []);

  // Uri 변화 시 실행
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) createNewSBT();
    else didMount.current = true;
  }, [tokenUri]);

  // ipfs URI 생성
  const createURI = async () => {
    setIsLoading(true);
    try {
      const fileCid = await client.storeBlob(new Blob([sbtImage]));
      const obj = {
        name: sbtName,
        description: sbtDesc,
        image: 'https://ipfs.io/ipfs/' + fileCid,
        email: userEmail,
      };
      const metadataCid = await client.storeBlob(
        new Blob([JSON.stringify(obj)]),
      );
      setTokenUri('https://ipfs.io/ipfs/' + metadataCid);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  // 새로운 SBT 생성
  const createNewSBT = async () => {
    let tokenContract;
    if (walletType === 'eth') {
      tokenContract = await new web3.eth.Contract(TTOT_ABI, GOERLI_TTOT, {
        from: account,
      });
      tokenContract.options.address = GOERLI_TTOT;
      await tokenContract.methods.mintSbt(tokenUri, tokenDeadline, tokenPrice, tokenPerformId, tokenSeat, tokenSeatLimit).send({ from: account });
    } else {
      return;
    }
    setIsLoading(false);
    setIsMint(true);
  };

  // 내 잔고 가져오기
  useEffect(() => {
    async function myBalance() {
      const _network = await web3.eth.net.getNetworkType();
      setNetwork(_network);
      web3.eth.getBalance(account).then((bal) => {
        // 잔액을 일반적인 통화 단위로 변환하고 상태 변수에 저장|
        const convertedBal = web3.utils.fromWei(bal);
        setBalance(convertedBal);
      });
    }
    myBalance();
  }, [account]);

  function onChange(value) {
    console.log('Captcah value:', value);
  }

  function getUserEmail(userData) {
    const email =
      (userData && (userData.email || userData.kakao_account.email)) ||
      'Log in, please.';
    return email;
  }

  function backToPaymemt(e) {
    navigate(`/payment?id=${dataId}`, {
      state: { tab: e.target.value },
    });
  }

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
            당신의 e-mail{' '}
            <p style={{ color: colors.natural95, fontSize: '20px' }}>
              {getUserEmail(userData)}
            </p>
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
              createURI();
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
          {isMint ? (
            <CompletedContainer>Completed Create!!</CompletedContainer>
          ) : isLoading ? (
            <CompletedContainer>
              <LoadingSpinner />
            </CompletedContainer>
          ) : (
            ''
          )}
        </Row>
        <Row marginTop={'25px'}>
          <TabButton
            value="APP_SelectSeats"
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
