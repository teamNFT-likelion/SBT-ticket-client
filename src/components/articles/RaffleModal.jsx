import styled from 'styled-components';
// import * as colors from '@styles/colors';
import { Column } from '@components/atoms/wrapper.style';
import { useCountdown } from '@hooks/useCountdown';
import blackPinkRaffle from '@assets/img/blackPinkRaffle.jpg';

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

const ModalTempBox = styled(Column)`
  width: 300px;
  height: 400px;
  align-items: center;
  margin: 10px;
`;

export default function RaffleModal() {
  const targetDate = new Date('2023-01-18 18:00:00');
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  const ShowCountDown = ({ days, hours, minutes, seconds }) => {
    const day = days < 10 ? `0${days}` : days;
    const hour = hours < 10 ? `0${hours}` : hours;
    const minute = minutes < 10 ? `0${minutes}` : minutes;
    const second = seconds < 10 ? `0${seconds}` : seconds;

    return `${day}:${hour}:${minute}:${second}`;
  };

  return (
    <>
      Raffle Event
      <ModalTempBox>
        <img
          src={blackPinkRaffle}
          alt="blackpinkRaffleImg"
          style={{ width: '300px' }}
        />
        <Column
          style={{
            width: '300px',
            height: '180px',
            backgroundColor: '#ffffff',
            color: '#000000',
          }}
        >
          ~블랙핑크 응원봉~
        </Column>
        <ShowCountDown
          days={Number(days)}
          hours={Number(hours)}
          minutes={Number(minutes)}
          seconds={Number(seconds)}
        />
        <TicketButtonWrapper>
          <TicketButton
            buttonColor={`#fa0800c5`}
            onClick={() => console.log('응모 완료')}
          >
            응모
          </TicketButton>
        </TicketButtonWrapper>
      </ModalTempBox>
    </>
  );
}
