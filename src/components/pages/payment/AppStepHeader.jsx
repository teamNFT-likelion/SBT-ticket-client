import React from 'react';
import * as colors from '@styles/colors';

const AppStepHeader = () => {
  return (
    <div
      style={{
        color: 'white',
        display: 'flex',
        width: '100%',
        height: '70px',
        alignItems: 'center',
        marginBottom: '40px',
        gap: '10px',
        fontSize: '20px',
      }}
    >
      <div
        style={{
          flex: 1,
          backgroundColor: 'orange',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        날짜 / 회차 선택
      </div>
      <div
        style={{
          flex: 1,
          backgroundColor: colors.primary40,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        등급 / 좌석 선택
      </div>
      <div
        style={{
          flex: 1,
          backgroundColor: colors.primary40,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        주문자 정보 / 결제
      </div>

      <div
        style={{
          flex: 1,
          backgroundColor: colors.primary40,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        결제완료
      </div>
    </div>
  );
};

export default AppStepHeader;
