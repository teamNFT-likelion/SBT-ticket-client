import React from 'react';
import { useRecoilValue } from 'recoil';
import { format } from 'date-fns';
import * as colors from '@styles/colors';
import { CompletedContainer } from '@styles/ApaymentStyles';
import LoadingSpinner from '@atoms/LoadingSpinner';
import {
  tDeadlineState,
  tPartState,
  tSeatState,
  tPriceState,
  tTokenPriceState,
  tPricePerTokenState,
  preTicketState,
} from '@states/paymentState';

const TicketInfo = ({ data, isLoading, inactiveId }) => {
  const part = useRecoilValue(tPartState);
  const deadline = useRecoilValue(tDeadlineState);
  const seat = useRecoilValue(tSeatState);
  const price = useRecoilValue(tPriceState);
  const tokenPrice = useRecoilValue(tTokenPriceState);
  const pricePerToken = useRecoilValue(tPricePerTokenState);

  const preTState = useRecoilValue(preTicketState);

  return (
    <div style={{ position: 'relative' }}>
      {isLoading && (
        <CompletedContainer>
          <LoadingSpinner />
        </CompletedContainer>
      )}
      <div style={{ zIndex: 1, opacity: isLoading ? 0.3 : 1 }}>
        <img src={data.posterImgUrl} alt="img" style={{ width: '70px', marginBottom: '12px' }} />
        <div>
          {data.preTicketing && (preTState === '진행중' ? '[사전예매]  ' : '') + data.title}
        </div>
        <div
          style={{
            marginTop: '40px',
            marginBottom: '8px',
            fontSize: '24px',
            color: colors.primary80,
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
          <div style={{ color: colors.primary40 }}>일시</div>
          <div>{format(new Date(deadline), 'yyyy.MM.dd HH:mm')}</div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid white',
            padding: '8px 0',
          }}
        >
          <div style={{ color: colors.primary40 }}>회차</div>
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
                  padding: '8px 0',
                }}
              >
                <div style={{ color: colors.primary40 }}>{i === 0 ? '좌석 정보' : ''}</div>
                <div>{id}</div>
              </div>
            );
          })}
        {price > 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: '1px solid white',
              borderBottom: '1px solid white',
              padding: '8px 0',
            }}
          >
            <div style={{ color: colors.primary40 }}>결제 금액</div>
            <div>{price} 원</div>
          </div>
        )}
        {tokenPrice > 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid white',
              padding: '8px 0',
            }}
          >
            <div style={{ color: colors.primary40 }}>토큰 결제</div>
            <div>
              {tokenPrice.toFixed(2)}MATIC
              <br />
              (개당 {pricePerToken.toFixed(2)}원)
            </div>
          </div>
        )}
        {inactiveId !== 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid white',
              padding: '8px 0',
            }}
          >
            <div style={{ color: colors.natural95, fontSize: '18px' }}>
              사용할 inactive ticket ID
            </div>
            <div>{inactiveId}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketInfo;
