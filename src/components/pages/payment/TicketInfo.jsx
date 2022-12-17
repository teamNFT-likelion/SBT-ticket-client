import React from 'react';
import { useRecoilValue } from 'recoil';
import { format } from 'date-fns';
import * as colors from '@styles/colors';
import { CompletedContainer } from '@styles/ApaymentStyles';
import LoadingSpinner from '@atoms/LoadingSpinner';
import {
  tDateState,
  tPartState,
  tSeatState,
  tPriceState,
} from '@states/paymentState';

const TicketInfo = ({ data, isLoading }) => {
  const date = useRecoilValue(tDateState);
  const part = useRecoilValue(tPartState);
  const seat = useRecoilValue(tSeatState);
  const price = useRecoilValue(tPriceState);

  return (
    <div style={{ position: 'relative' }}>
      {isLoading && (
        <CompletedContainer>
          <LoadingSpinner />
        </CompletedContainer>
      )}
      <div style={{ zIndex: 1, opacity: isLoading ? 0.3 : 1 }}>
        <img
          src={data.posterImgUrl}
          alt="img"
          style={{ width: '50px', marginBottom: '6px' }}
        />
        <div>{data.title}</div>
        <div
          style={{
            marginTop: '30px',
            marginBottom: '8px',
            fontSize: '24px',
            color: colors.primary40,
          }}
        >
          예매정보
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid white',
            borderBottom: '1px solid white',
            padding: '8px 0',
          }}
        >
          <div>일시</div>
          <div>
            {format(new Date(date), 'yyyy.MM.dd')}{' '}
            {data.dateInfo[part].startTime}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid white',
            padding: '8px 0',
          }}
        >
          <div>회차</div>
          <div>{part + 1}회차</div>
        </div>
        {seat.length > 0 &&
          seat.map((id, i) => {
            return (
              <div
                key={id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid white',
                  padding: '8px 0',
                }}
              >
                <div>{i === 0 ? '좌석 정보' : ''}</div>
                <div>{id}</div>
              </div>
            );
          })}
        {price > 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid white',
              padding: '8px 0',
            }}
          >
            <div>결제 금액</div>
            <div>{price} 원</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketInfo;
