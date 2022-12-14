import React from 'react';
import LinkButton from '@atoms/LinkButton';
import * as colors from '@styles/colors';
import Wallet from '@components/wallets/Wallet';
import { useRecoilValue } from 'recoil';
import { userState } from '@states/userState';

import { ButtonsWrapper, SelectInfoBox } from '@styles/ticketDetailStyle';

export default function RemainSeatsAndPay({
  partState,
  dataId,
  data,
  onPaymentClick,
}) {
  const { address } = useRecoilValue(userState);

  let ToPaymentPage;

  if (address) {
    ToPaymentPage = () => {
      return (
        // TODO: LinkButton 리팩토링 필요
        // TODO: payment 페이지에서 id 로 받아오는거 좀 이상함 고민필요
        <ButtonsWrapper onClick={onPaymentClick}>
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
