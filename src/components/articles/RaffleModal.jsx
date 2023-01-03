import { useState } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { Column } from '@components/atoms/wrapper.style';
import { useCountdown } from '@hooks/useCountdown';
import { useRaffleContract } from '@hooks/useRaffleContract';
import useWeb3 from '@hooks/useWeb3';
import raffle1 from '@assets/img/raffle_1.png';
import raffle2 from '@assets/img/raffle_2.jpg';
import { useRecoilValue } from 'recoil';
import { userState } from '@states/userState';

export default function RaffleModal({ setRaffleModal }) {
  const targetDate = new Date('2023-01-18 18:00:00');
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  const [value, setValue] = useState('');
  const { account } = useRecoilValue(userState);
  const { web3 } = useWeb3();
  const { join } = useRaffleContract(web3);
  const [isAvailable, setIsAvailable] = useState(true); //TODO: 응모불가능한상태 메인컨트랙트에 토큰아이디 별로 체크필요

  const ShowCountDown = ({ days, hours, minutes, seconds }) => {
    const day = days < 10 ? `0${days}` : days;
    const hour = hours < 10 ? `0${hours}` : hours;
    const minute = minutes < 10 ? `0${minutes}` : minutes;
    const second = seconds < 10 ? `0${seconds}` : seconds;

    return `${day}일 ${hour}시간 ${minute}분 ${second}초`;
  };

  if (!isAvailable) {
    return (
      <ModalTempBox>
        <div style={{ position: 'relative' }}>
          <img src={raffle2} alt="raffle2" style={{ width: '300px' }} />
          <RaffleTitle>
            Web3 Monkey Concert <br />
            Grand Opening
          </RaffleTitle>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            color: colors.primary80,
            fontSize: '32px',
            marginTop: '16px',
            marginBottom: '32px',
          }}
        >
          <ShowCountDown
            days={Number(days)}
            hours={Number(hours)}
            minutes={Number(minutes)}
            seconds={Number(seconds)}
          />
        </div>
        <TicketButtonWrapper>
          <TicketButton buttonColor={`#fa0800c5`} onClick={() => setRaffleModal(false)}>
            확인
          </TicketButton>
        </TicketButtonWrapper>
      </ModalTempBox>
    );
  }

  return (
    <ModalTempBox>
      <img src={raffle1} alt="raffle1" style={{ width: '300px' }} />
      <Input
        type="text"
        placeholder="참여코드를 입력 하세요."
        onChange={(e) => setValue(e.target.value)}
      />
      <TicketButtonWrapper>
        <TicketButton
          buttonColor={`#fa0800c5`}
          onClick={() => {
            join(value, { from: account }, () => {
              setRaffleModal(false);
              setIsAvailable(false); // TODO: 임시코드
              setValue('');
            });
          }}
        >
          응모
        </TicketButton>
      </TicketButtonWrapper>
    </ModalTempBox>
  );
}

const TicketButtonWrapper = styled('div')`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const TicketButton = styled('button')`
  background-color: ${(props) => props.buttonColor};
  width: 100px;
  height: 36px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 3px;
`;

const ModalTempBox = styled(Column)`
  width: 300px;
  align-items: center;
`;

const Input = styled('input')`
  width: 100%;
  height: 36px;
  margin-top: 16px;
  margin-bottom: 32px;
  outline: none;
  font-size: 20px;
  background-color: ${colors.bgBlack};
  border: 2px solid ${colors.primary40};
  color: white;
  border-radius: 6px;
  padding-left: 12px;
`;

const RaffleTitle = styled('div')`
  position: absolute;
  top: 6px;
  right: 6px;
  text-align: right;
  color: rgba(239, 239, 240, 0.5);
  font-size: 20px;
`;
