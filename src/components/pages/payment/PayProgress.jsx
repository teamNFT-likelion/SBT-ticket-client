import React from 'react';
import LoadingText from '@atoms/LoadingText';
import CheckedText from '@atoms/CheckedText';
import UnCheckedText from '@atoms/UnCheckedText';
import PayCanceledInfo from './PayCanceledInfo';

const PayProgress = ({ status, cancelInfo }) => {
  return (
    <>
      <div style={{ width: '100%', marginBottom: '24px' }}>
        {status === 0 && <LoadingText text="결제수단 승인이 진행중 입니다..." />}
        {status > 0 && <CheckedText text="결제수단 승인이 완료 되었습니다." />}
      </div>

      <div style={{ width: '100%', marginBottom: '24px' }}>
        {status === 1 && <LoadingText text="결제승인 진행중 입니다..." />}
        {status > 1 && <CheckedText text="결제 승인이 완료 되었습니다." />}
      </div>

      <div style={{ width: '100%', marginBottom: '24px' }}>
        {status === 2 && <LoadingText text="민팅 진행중 입니다..." />}
        {status === 3 && <CheckedText text="민팅이 완료 되었습니다." />}
        {status > 3 && <UnCheckedText text="민팅에 실패 하였습니다." />}
      </div>

      <div style={{ width: '100%', marginBottom: '24px' }}>
        {status === 4 && <LoadingText text="결제 취소가 진행중 입니다..." />}
        {status > 4 && (
          <>
            <CheckedText text="결제 취소가 완료 되었습니다." />
            <PayCanceledInfo cancelInfo={cancelInfo} />
          </>
        )}
      </div>
    </>
  );
};

export default PayProgress;
