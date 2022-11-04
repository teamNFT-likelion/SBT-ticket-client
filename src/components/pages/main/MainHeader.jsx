import React from 'react';
import styled from 'styled-components';
import logottot from '@assets/img/logo_ttot.png';
import * as colors from '@styles/colors';

const Container = styled('div')`
  height: 122px;
  width: 100%;
  align-items: center;
  display: flex;
  padding: 0 20px;
  position: fixed;
  top: 0;
  background-color: ${colors.bgPrimary};
  z-index: 999;
`;

const LogoImage = styled('img')`
  width: 100px;
`;

const MainHeader = ({ onNavClick }) => {
  return (
    //TODO: 인라인css 리팩토링필요
    <Container>
      <LogoImage src={logottot} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: '100%',
          height: '100%',
          marginLeft: '24px',
          fontSize: '32px',
        }}
      >
        <button style={{ fontSize: '32px' }} onClick={onNavClick} value="goal">
          문제
        </button>
        <button
          style={{ fontSize: '32px' }}
          onClick={onNavClick}
          value="benefit"
        >
          장점
        </button>
        <button
          style={{ fontSize: '32px' }}
          onClick={onNavClick}
          value="roadmap"
        >
          로드맵
        </button>
        <button style={{ fontSize: '32px' }} onClick={onNavClick} value="faq">
          QnA
        </button>
      </div>
    </Container>
  );
};

export default MainHeader;
