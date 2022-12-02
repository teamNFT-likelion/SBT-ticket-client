import React from 'react';
import { TabButton } from '@styles/ApaymentStyles';
import { PartButtonContainer, SelectInfoBox } from '@styles/ticketDetailStyle';

export default function PartInfoContainer({ data, setPartState }) {
  return (
    <SelectInfoBox>
      회차
      <PartButtonContainer>
        {data.dateInfo.map((_, index) => (
          <TabButton
            value={index}
            onClick={(newTab) => {
              setPartState(newTab.target.value);
            }}
            style={{ width: '70px', height: '30px', fontSize: '15px' }}
            key={index}
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
