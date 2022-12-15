import React from 'react';
import * as colors from '@styles/colors';
import { TabButton } from '@styles/ApaymentStyles';
import { PartButtonContainer, SelectInfoBox } from '@styles/ticketDetailStyle';

export default function PartInfoContainer({ onPartClick, data, partState }) {
  return (
    <SelectInfoBox>
      회차
      <PartButtonContainer>
        {data.dateInfo.map((info, index) => (
          <TabButton
            value={index}
            onClick={onPartClick}
            style={{
              width: '70px',
              height: '30px',
              fontSize: '15px',
              backgroundColor:
                partState === index ? 'orange' : colors.primary40,
            }}
            key={info.date}
          >
            {index + 1}회차
          </TabButton>
        ))}
      </PartButtonContainer>
      CAST
      <span style={{ paddingTop: '10px' }}>{data.cast}</span>
    </SelectInfoBox>
  );
}
