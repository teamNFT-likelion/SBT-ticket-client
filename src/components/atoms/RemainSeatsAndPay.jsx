import React from 'react';
import LinkButton from '@atoms/LinkButton';
import * as colors from '@styles/colors';
import Wallet from '@components/wallets/Wallet';
import { useRecoilState } from 'recoil';
import { userState } from '@states/userState';

import { ButtonsWrapper, SelectInfoBox } from '@styles/ticketDetailStyle';

export default function RemainSeatsAndPay({ partState, dataId, data }) {
  const [walletAddress] = useRecoilState(userState);

  let ToPaymentPage;

  if (walletAddress.address) {
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
