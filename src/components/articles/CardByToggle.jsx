import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled('div')`
  border: 3px solid ${(props) => props.setting.borderColor};
  border-radius: 30px;
  margin: 20px 150px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: auto;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: ${(props) => !props.props && '#dfffb437'};
  }
`;

const TextContainer = styled('div')`
  padding-top: 30px;
  line-height: 150%;
  font-size: 20.3px;
  padding-left: 10px;
`;


const CardByToggle = ({ title, text }) => {
  const initialSetting = { borderColor: '#6D6D6D' };
  const changedSetting = { borderColor: '#7E9E10' };
  const [isOpened, setIsOpened] = useState(false);
  const [styleSetting, setStyleSetting] = useState(initialSetting);

  // isOpen ? 닫 : 열
  return (
    //TODO: 인라인css 리팩토링필요, text 폰트 color 먹히도록 수정
    <Container props={isOpened} setting={styleSetting}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '30px' }}>{title}</span>
        <button
          onClick={() => {
            setIsOpened((prev) => !prev);
            if (!isOpened) setStyleSetting(changedSetting);
            else {
              setStyleSetting(initialSetting);
            }
          }}
        >
          {isOpened ? '🔺' : '🔻'}
        </button>
      </div>
      {isOpened && <TextContainer>{text}</TextContainer>}
    </Container>
  );
};

export default CardByToggle;
