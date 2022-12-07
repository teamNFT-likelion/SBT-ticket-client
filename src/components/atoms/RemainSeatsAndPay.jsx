import React, { useState } from 'react';
import LinkButton from '@atoms/LinkButton';
import * as colors from '@styles/colors';
import Wallet from '@components/wallets/Wallet';

import { ButtonsWrapper, SelectInfoBox } from '@styles/ticketDetailStyle';

export default function RemainSeatsAndPay({ partState, dataId, data }) {
  //recoil 필요
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem('_user'),
  );

  let ToPaymentPage;

  if (walletAddress) {
    console.log(walletAddress);
    ToPaymentPage = () => {
      return (
        <ButtonsWrapper>
          <LinkButton to={`/payment?id=${dataId}`} name="결제" />
        </ButtonsWrapper>
      );
    };
  } else {
    ToPaymentPage = () => {
      return (
        <ButtonsWrapper>
          <Wallet />
        </ButtonsWrapper>
      );
    };
  }

  return (
    <SelectInfoBox>
      잔여석
      <span style={{ padding: '10px', fontSize: '20px', color: colors.bgRed }}>
        {data.dateInfo[partState].seatCount}석
      </span>
      <ToPaymentPage />
    </SelectInfoBox>
  );
}
