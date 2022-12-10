import React, { useState } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import CustomModal from '@articles/CustomModal';
import { format } from 'date-fns';
import QRCode from 'qrcode.react';
import RaffleModal from '@components/articles/RaffleModal';

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

const DateWrapper = styled('div')`
  color: ${colors.textSecondary};
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
  margin-top: 30px;
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

const MyTicket = ({ id, image, title, date, active }) => {
  // 모달을 위한 state
  const [showUseQr, setShowUseQr] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  const [showFan, setShowFan] = useState(false);
  const [raffleModal, setRaffleModal] = useState(false);

  // qr코드 발행을 위한 state
  const [qrvalue, setQrvalue] = useState('DEFAULT');

  return (
    <div>
      <TicketWrapper key={id}>
        <TicketImage>{image}</TicketImage>
        <TicketContent>
          <TextWrapper>{title}</TextWrapper>
          <DateWrapper>
            ~{format(new Date(Number(date) * 1000), 'yyyy.MM.dd')}
          </DateWrapper>
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
          <ModalButton
            buttonColor={`#af00a7`}
            onClick={() => setRaffleModal(true)}
          >
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
      <CustomModal show={raffleModal} toggleModal={() => setRaffleModal(false)}>
        <RaffleModal />
      </CustomModal>
    </div>
  );
};

export default MyTicket;
