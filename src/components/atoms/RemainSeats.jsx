import React from 'react';
import LinkButton from '@atoms/LinkButton';
import * as colors from '@styles/colors';

import { ButtonsWrapper, SelectInfoBox } from '@styles/ticketDetailStyle';

export default function RemainSeats({ partState, dataId, data }) {
  return (
    <SelectInfoBox>
      잔여석
      <span style={{ padding: '10px', fontSize: '20px', color: colors.bgRed }}>
        {data.dateInfo[partState].seatCount}석
      </span>
      <ButtonsWrapper>
        <LinkButton to={`/payment?id=${dataId}`} name="결제" />
      </ButtonsWrapper>
    </SelectInfoBox>
  );
}
