import React from 'react';
import * as colors from '@styles/colors';
import raffle from '@assets/img/raffle_2.jpg';
import { useCountdown } from '@hooks/useCountdown';
import { ShowCountDown } from '@utils/parser';

const Raffle = ({ handleScrollByRef }) => {
  const targetDate = new Date('2023-01-18 18:00:00');
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  return (
    <div style={{ display: 'flex', width: '100%', gap: '16px' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <img src={raffle} style={{ width: '100%', borderRadius: '20px' }} alt="" />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '24px',
            textAlign: 'right',
            color: 'rgba(239, 239, 240, 0.5)',
          }}
        >
          <div style={{ fontSize: '40px' }}>
            Web3 Monkey Concert <br />
            Grand Opening
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            padding: '16px 32px',
            right: '24px',
            bottom: '24px',
            border: `1px solid ${colors.primary80}`,
            color: colors.primary80,
            fontSize: '32px',
          }}
        >
          0명 참여중
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid rgba(239, 239, 240, 0.5)',
          color: 'white',
          borderRadius: '20px',
          fontSize: '28px',
        }}
      >
        <div style={{ fontSize: '70px', color: colors.primary80, marginBottom: '30px' }}>
          <ShowCountDown
            days={Number(days)}
            hours={Number(hours)}
            minutes={Number(minutes)}
            seconds={Number(seconds)}
          />
        </div>
        <div>참여코드</div>
        <div
          style={{
            padding: '10px 32px',
            backgroundColor: colors.primary80,
            color: 'gray',
            margin: '12px 0',
          }}
        >
          A1DMKBNZI55
        </div>
        <div style={{ fontSize: '14px' }}>
          공연 sbt 보유자 전용 래플 상품입니다.{' '}
          <span
            onClick={handleScrollByRef}
            style={{ textDecoration: 'underline', fontSize: '12px', cursor: 'pointer' }}
          >
            자세히보기
          </span>
        </div>
      </div>
    </div>
  );
};

export default Raffle;
