import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import CustomModal from '@articles/CustomModal';
import { format } from 'date-fns';
import QRCode from 'qrcode.react';
import RaffleModal from '@components/articles/RaffleModal';
import PreTicketingModal from '@components/articles/PreTicketingModal';
import useOauth from '@hooks/useOauth';
import { toast } from 'react-toastify';
import QRCertificate from '@components/pages/account/QRCertificate';
import useMint from '@hooks/useMint';
import PreTicketingCustomModal from '@components/articles/PreTicketingCustomModal';
import QRCustomModal from '@components/articles/QRCustomModal';

const TicketWrapper = styled('div')`
  width: auto;
  height: 550px;
  border: 3px solid ${colors.primary80};
  border-radius: 20px;
`;

const TicketImage = styled('img')`
  width: 300px;
  height: 75%;
  border-top: 3px solid ${colors.primary80};
  border-bottom: 3px solid ${colors.primary80};
`;

const TicketContent = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  gap: 5px;
`;

const TextWrapper = styled('div')`
  display: block;
  padding: 10px;
  border-radius: 17px 17px 0 0;
  background-color: ${({ isActive }) => (isActive ? colors.primary40 : '#af00a7')};
`;

const ContentWrapper = styled('div')`
  color: ${colors.textSecondary};
`;

const TicketButtonWrapper = styled('div')`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  gap: 10px;
  flex-wrap: wrap; //TODO : 임시
`;

const TicketButton = styled('button')`
  background-color: ${(props) => props.buttonColor};
  width: 100px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 3px;
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

const QRText = styled('p')`
  font-size: 1rem;
  margin-top: 15px;
`;

const MyTicket = ({ id, uri, date, hostAddr, price, seats, image, title, tEmail, active }) => {
  // 모달을 위한 state
  const [showUseQr, setShowUseQr] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  const [showFan, setShowFan] = useState(false);
  const [showBurn, setShowBurn] = useState(false);
  const [raffleModal, setRaffleModal] = useState(false);
  const [preTicketModal, setPreTicketModal] = useState(false);
  const [goodsModal, setGoodsModal] = useState(false);

  // 본인인증을 위한 state
  const { email: userEmail, setPopup, popup } = useOauth();

  // 본인인증 여부
  const [isAuthorized, setIsAuthorized] = useState(false);

  // qr코드 발행을 위한 state
  // qr value = `${공연정보(공연id나 제목) + ${날짜} + ${sbtId} + ${qr생성하는 현재시간}`
  const [qrvalue, setQrvalue] = useState(`${title}${date}${id}${Date.now()}`);

  // 본인인증 후 첫 생성/새로고침 여부
  const [isReGenerated, setIsReGenerated] = useState(false);

  // 환불
  const { refundSBT, burnSBT } = useMint();
  const handleRefund = async () => {
    try {
      await refundSBT(id);
      window.location.reload();
    } catch (error) {
      console.log('Refund Error: ', error);
      toast.error('환불 실패');
    }
  };
  const handleBurn = async () => {
    try {
      await burnSBT(id);
      window.location.reload();
    } catch (error) {
      console.log('Burn Error: ', error);
      toast.error('소각 실패');
    }
  };

  useEffect(() => {
    const receiveMessage = async (e) => {
      //TODO: oauth 데이터 저장 리팩토링고려, 에러시 처리 안된거 리팩토링, getInfo용 페이지 생성고려
      // console.log(e.data.oauthData);
      if (e.data.hasOwnProperty('oauthData')) {
        popup?.close();
        setPopup(null);
      }
    };

    window.addEventListener('message', receiveMessage, false);
    return () => window.removeEventListener('message', receiveMessage);
  }, [popup, setPopup]);

  function handleUseQR() {
    console.log('userEmail : ', userEmail);
    console.log('tokenEmail : ', tEmail);

    if (!userEmail) {
      setIsAuthorized(false);
      toast.error('본인인증이 필요합니다.', { autoClose: 2000 });
    } else if (!tEmail) {
      setIsAuthorized(false);
      toast.error('티켓 소유자의 이메일을 찾을 수 없습니다.', {
        autoClose: 2000,
      });
    } else if (userEmail === tEmail) {
      setIsAuthorized(true);
      setQrvalue(title + date + id + Date.now());
      if (!isReGenerated) {
        toast.success('이메일과 sbt정보가 일치합니다.', { autoClose: 2000 });
      }
    } else {
      setIsAuthorized(false);
      toast.error('티켓 소유자의 이메일과 일치하지 않습니다.', {
        autoClose: 2000,
      });
    }
  }

  return (
    <div>
      <TicketWrapper key={id}>
        <TextWrapper isActive={active}>
          {title} #{id}
        </TextWrapper>
        <TicketImage src={image.data} alt="ticket" />
        <TicketContent>
          <ContentWrapper style={{ color: colors.textWhite }}>
            {seats.map((seat) => `[${seat}] `)}
          </ContentWrapper>
          <ContentWrapper>{format(new Date(date), 'yyyy.MM.dd')}</ContentWrapper>
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
              <TicketButton
                buttonColor={`${colors.bgRed}`}
                onClick={() => {
                  setShowBurn(true);
                }}
              >
                소각
              </TicketButton>
            </TicketButtonWrapper>
          )}
        </TicketContent>
      </TicketWrapper>

      <QRCustomModal show={showUseQr} toggleModal={() => setShowUseQr(false)}>
        {!isAuthorized ? (
          <>
            <p>QR을 발행을 위해 본인 인증을 진행해주세요.</p>
            <QRCertificate setPopup={setPopup} />
            <ModalButtonWrapper>
              <ModalButton
                buttonColor={`${colors.primary40}`}
                onClick={() => {
                  handleUseQR();
                }}
              >
                QR 발행하기
              </ModalButton>
              {/* 취소 부분이 아닌 다른 곳을 누른 뒤 꺼지면 qr이 남아있음 */}
              <ModalButton
                buttonColor={`${colors.bgBlack}`}
                onClick={() => {
                  setShowUseQr(false);
                }}
              >
                취소
              </ModalButton>
            </ModalButtonWrapper>
          </>
        ) : (
          <>
            <QRCode value={qrvalue} size={256} />
            <QRText style={{ marginTop: '30px' }}>사용하기 전에 새로고침을 눌러주세요.</QRText>
            <QRText style={{ color: colors.bgRed }}>QR코드 유효기간은 3초 입니다.</QRText>
            <ModalButtonWrapper>
              <ModalButton
                buttonColor={`${colors.primary40}`}
                onClick={() => {
                  setIsReGenerated(true);
                  handleUseQR();
                }}
              >
                QR 새로고침
              </ModalButton>
              {/* 취소 부분이 아닌 다른 곳을 누른 뒤 꺼지면 qr이 남아있음 */}
              <ModalButton
                buttonColor={`${colors.bgBlack}`}
                onClick={() => {
                  setShowUseQr(false);
                }}
              >
                취소
              </ModalButton>
            </ModalButtonWrapper>
          </>
        )}
      </QRCustomModal>
      <CustomModal show={showRefund} toggleModal={() => setShowRefund(false)}>
        정말 환불하시겠습니까?
        <ModalButtonWrapper>
          <ModalButton
            buttonColor={`${colors.bgRed}`}
            onClick={() => {
              handleRefund();
              setShowRefund(false);
            }}
          >
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
          <ModalButton
            buttonColor={`#af00a7`}
            onClick={() => {
              setShowFan(false);
              setPreTicketModal(true);
            }}
          >
            사전 예매
          </ModalButton>
          <ModalButton
            buttonColor={`#af00a7`}
            onClick={() => {
              setShowFan(false);
              setRaffleModal(true);
            }}
          >
            래플 이벤트
          </ModalButton>
        </ModalButtonWrapper>
        <ModalButtonWrapper>
          <ModalButton buttonColor={`#af00a7`} onClick={() => setGoodsModal(true)}>
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
      <CustomModal show={raffleModal} toggleModal={() => setRaffleModal(false)}>
        <RaffleModal setRaffleModal={setRaffleModal} />
      </CustomModal>
      <PreTicketingCustomModal show={preTicketModal} toggleModal={() => setPreTicketModal(false)}>
        <PreTicketingModal setPreTicketModal={setPreTicketModal} hostAddr={hostAddr} />
      </PreTicketingCustomModal>
      <CustomModal show={goodsModal} toggleModal={() => setGoodsModal(false)}>
        준비중입니다...
      </CustomModal>

      <CustomModal show={showBurn} toggleModal={() => setShowBurn(false)}>
        정말 소각하시겠습니까?
        <ModalButtonWrapper>
          <ModalButton
            buttonColor={`${colors.bgRed}`}
            onClick={() => {
              handleBurn();
              setShowBurn(false);
            }}
          >
            소각하기
          </ModalButton>
          <ModalButton
            buttonColor={`${colors.bgBlack}`}
            onClick={() => {
              setShowBurn(false);
            }}
          >
            취소
          </ModalButton>
        </ModalButtonWrapper>
      </CustomModal>
    </div>
  );
};

export default MyTicket;
