import React, { useState, useEffect } from 'react';
import Layout from '@articles/Layout';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import metamaskImageUrl from '@assets/icon/MetaMask.png';
import CustomModal from '@articles/CustomModal';
import QRCode from 'qrcode.react';
import Web3 from 'web3';
import axios from 'axios';
import { GOERLI_TTOT } from '@contracts/ContractAddress';
import { TTOT_ABI } from '@contracts/ABI';

// TODO : 5초마다 qr코드 갱신 / 캡쳐불가

const AddressWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: ${colors.textWhite};
  margin-top: 20px;
`;

const ImageWrapper = styled('img')`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  object-fit: contain;
`;

const TabNavigation = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 50px 0;
`;

const TabButton = styled('button')`
  width: 15.6%;
  height: 64px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 5px;
  margin: 3px;
  border: 3px solid;
  color: ${({ isActive }) => (isActive ? colors.primary80 : null)};
  background-color: ${({ isActive }) => (isActive ? colors.primary40 : null)};
`;

const TicketContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const TicketWrapper = styled('div')`
  width: auto;
  height: 500px;
  border: 3px solid ${colors.primary40};
  border-radius: 5%;
`;

const TicketImage = styled('div')`
  width: 300px;
  height: 80%;
  border-bottom: 3px solid ${colors.primary40};
`;

const TicketContent = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20%;
`;

const TextWrapper = styled('span')`
  display: block;
`;

const TicketButtonWrapper = styled('div')`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
`;

const TicketButton = styled('button')`
  background-color: ${(props) => props.buttonColor};
  width: 100px;
  height: 36px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 3px;
  margin: 2px;
`;

const ModalButtonWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 10px;
`;

const ModalButton = styled('div')`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.buttonColor};
  box-sizing: border-box;
  width: 100px;
  min-height: 50px;
  border-radius: 5px;
  font-size: 1.2rem;
  border: none;
  outline: none;
  margin: 10px 20px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 10;
`;

const ethereum = window.ethereum;

const AccountPage = () => {
  // 모달을 위한 state
  const [showUseQr, setShowUseQr] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  const [showFan, setShowFan] = useState(false);

  // 지금 로그인한 지갑 정보 저장 state
  const [account, setAccount] = useState('');
  const [walletType, setWalletType] = useState('');

  // tap 키 저장 state
  const [tab, setTab] = useState('ALL');

  // 내 sbt 저장과 active와 inactive 티켓 filter 저장 state
  const [sbtList, setSbtList] = useState([]);
  const [activeData, setActiveData] = useState([]);
  const [inactiveData, setInactiveData] = useState([]);

  // qr코드 발행을 위한 state
  const [qrvalue, setQrvalue] = useState('DEFAULT');

  // 컨트랙트와 통신을 위한 객체 저장
  const [web3, setWeb3] = useState({});

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

  // 내 토큰들 불러오기
  useEffect(() => {
    async function saveMyToken() {
      let tokenContract;
      if (walletType === 'eth') {
        tokenContract = await new web3.eth.Contract(TTOT_ABI, GOERLI_TTOT);
      } else return;

      const MyTokens = await tokenContract.methods.getSbtTokens(account).call();
      const items = await Promise.all(
        MyTokens.map(async (i) => {
          let metadata = await axios.get(i.sbtTokenURI);
          let price;
          if (walletType === 'eth') {
            price = web3.utils.fromWei(i.price.toString(), 'ether');
          } else return;
          let item = {
            tokenId: Number(i.nftTokenId),
            tokenURI: i.nftTokenURI,
            tokenDL: i.deadline,
            tokenIsActive: i.isActive,
            tokenPrice: price,
            tokenImage: metadata.data.image,
            tokenTitle: metadata.data.title,
            tokenUserEmail: metadata.data.userEmail,
          };
          return item;
        }),
      );
      setSbtList(items);
    }
    saveMyToken();
  }, [account]);

  const Ticket = ({ id, image, title, date, active }) => {
    return (
      <TicketWrapper key={id}>
        <TicketImage>{image}</TicketImage>
        <TicketContent>
          <TextWrapper>{title}</TextWrapper>
          <TextWrapper>{date}</TextWrapper>
          {active ? (
            <TicketButtonWrapper>
              <TicketButton
                buttonColor={`${colors.primary40}`}
                onClick={() => {
                  setShowUseQr(true);
                }}
              >
                사용
              </TicketButton>
              <TicketButton
                buttonColor={`${colors.bgRed}`}
                onClick={() => {
                  setShowRefund(true);
                }}
              >
                환불
              </TicketButton>
            </TicketButtonWrapper>
          ) : (
            <TicketButtonWrapper>
              <TicketButton
                buttonColor={`#af00a7`}
                onClick={() => {
                  setShowFan(true);
                }}
              >
                팬 혜택
              </TicketButton>
            </TicketButtonWrapper>
          )}
        </TicketContent>
      </TicketWrapper>
    );
  };

  return (
    <Layout>
      <AddressWrapper>
        {walletType === 'eth' ? (
          <ImageWrapper src={metamaskImageUrl} />
        ) : null}
        {account}
      </AddressWrapper>
      <TabNavigation>
        <TabButton
          isActive={tab === 'ALL'}
          value="ALL"
          onClick={(newTab) => {
            setTab(newTab.target.value);
          }}
        >
          ALL
        </TabButton>
        <TabButton
          isActive={tab === 'ACTIVE'}
          value="ACTIVE"
          onClick={(newTab) => {
            setTab(newTab.target.value);
            setActiveData(
              sbtList.filter((token) => token.tokenIsActive === true),
            );
          }}
        >
          ACTIVE
        </TabButton>
        <TabButton
          isActive={tab === 'INACTIVE'}
          value="INACTIVE"
          onClick={(newTab) => {
            setTab(newTab.target.value);
            setInactiveData(
              sbtList.filter((token) => token.tokenIsActive === false),
            );
          }}
        >
          INACTIVE
        </TabButton>
      </TabNavigation>
      <TicketContainer>
        {tab === 'ALL' ? (
          <>
            {sbtList.map((ticket) => (
              <Ticket
                id={ticket.tokenId}
                image={ticket.tokenImage}
                title={ticket.tokenTitle}
                date={ticket.tokenDL}
                active={ticket.tokenIsActive}
              />
            ))}
          </>
        ) : null}
        {tab === 'ACTIVE' ? (
          <>
            {activeData.map((ticket) => (
              <Ticket
                id={ticket.tokenId}
                image={ticket.tokenImage}
                title={ticket.tokenTitle}
                date={ticket.tokenDL}
                active={ticket.tokenIsActive}
              />
            ))}
          </>
        ) : null}
        {tab === 'INACTIVE' ? (
          <>
            {inactiveData.map((ticket) => (
              <Ticket
                id={ticket.tokenId}
                image={ticket.tokenImage}
                title={ticket.tokenTitle}
                date={ticket.tokenDL}
                active={ticket.tokenIsActive}
              />
            ))}
          </>
        ) : null}
      </TicketContainer>
      <CustomModal show={showUseQr} toggleModal={() => setShowUseQr(false)}>
        {qrvalue !== 'DEFAULT' ? (
          <QRCode value={qrvalue} size={256} />
        ) : (
          'QR을 발행하기 위해서는 먼저 본인 인증을 진행해주세요.'
        )}
        <ModalButtonWrapper>
          <ModalButton
            buttonColor={`${colors.primary40}`}
            onClick={() => {
              setQrvalue('SUCCESS!');
            }}
          >
            QR 발행하기
          </ModalButton>
          {/* 취소 부분이 아닌 다른 곳을 누른 뒤 꺼지면 qr이 남아있음 */}
          <ModalButton
            buttonColor={`${colors.bgBlack}`}
            onClick={() => {
              setShowUseQr(false);
              setQrvalue('DEFAULT');
            }}
          >
            취소
          </ModalButton>
        </ModalButtonWrapper>
      </CustomModal>
      <CustomModal show={showRefund} toggleModal={() => setShowRefund(false)}>
        정말 환불하시겠습니까?
        <ModalButtonWrapper>
          <ModalButton buttonColor={`${colors.bgRed}`} onClick={() => {}}>
            환불 처리하기
          </ModalButton>
          <ModalButton
            buttonColor={`${colors.bgBlack}`}
            onClick={() => {
              setShowRefund(false);
            }}
          >
            취소
          </ModalButton>
        </ModalButtonWrapper>
      </CustomModal>
      <CustomModal show={showFan} toggleModal={() => setShowFan(false)}>
        팬 혜택을 고르세요.
        <ModalButtonWrapper>
          <ModalButton buttonColor={`#af00a7`} onClick={() => {}}>
            사전 예매
          </ModalButton>
          <ModalButton buttonColor={`#af00a7`} onClick={() => {}}>
            래플 이벤트
          </ModalButton>
        </ModalButtonWrapper>
        <ModalButtonWrapper>
          <ModalButton buttonColor={`#af00a7`} onClick={() => {}}>
            굿즈 구매
          </ModalButton>
          <ModalButton
            buttonColor={`${colors.bgBlack}`}
            onClick={() => {
              setShowFan(false);
            }}
          >
            취소
          </ModalButton>
        </ModalButtonWrapper>
      </CustomModal>
    </Layout>
  );
};

export default AccountPage;
