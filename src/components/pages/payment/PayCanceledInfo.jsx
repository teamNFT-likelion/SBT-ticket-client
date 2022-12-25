import React from 'react';

const PayCanceledInfo = ({ cancelInfo }) => {
  return (
    <div
      style={{
        fontSize: '24px',
        marginTop: '24px',
        marginLeft: '44px',
      }}
    >
      <div>{`cancelAmount: ${cancelInfo.cancelAmount}`}</div>
      <div>{`cancelReason: ${cancelInfo.cancelReason}`}</div>
      <div>{`canceledAt: ${cancelInfo.canceledAt}`}</div>
      <div>{`transactionKey: ${cancelInfo.transactionKey}`}</div>
    </div>
  );
};

export default PayCanceledInfo;
