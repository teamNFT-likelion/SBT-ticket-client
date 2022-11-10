import React from 'react';
import styled from 'styled-components';
import * as colors from "@styles/colors";
import ttotLogo from "@assets/img/logo_ttot.png";

const Container = styled('div')`
  width: 100%;
  height: 200px;
  padding: 20px;
  background-color: black;
  margin-top: 50px;
`;
const TtotLogoImage = styled('img')`
  height: 30px;
  margin-bottom: 14px;
`;
const FooterTextWrapper = styled('div')`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
`
const FooterText = styled.span`
  color: ${colors.textSecondary};
  font-size: 14px;
`;
const FooterLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 260px;
  margin-top: 26px;
`
const Divider = () => {
  return (
    <svg
      width={1}
      height={12}
      viewBox="0 0 1 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={1} height={12} fill="#3F3F46" />
    </svg>
  );
}

const Footer = () => {
  return (
    <Container>
      <TtotLogoImage src={ttotLogo} />
      <FooterTextWrapper>
        <FooterText>멋쟁이사자처럼 블록체인 스쿨 1기</FooterText>
        <FooterText>1팀</FooterText>
        <FooterText>TEAM NFT</FooterText>
      </FooterTextWrapper>
      <FooterTextWrapper>
        <FooterText>&copy; TTOT. 2022. All rights reserved</FooterText>
      </FooterTextWrapper>
      <FooterLinks>
        <FooterText>이용약관</FooterText>
        <Divider />
        <FooterText>개인정보처리방침</FooterText>
        <Divider />
        <FooterText>자주묻는질문</FooterText>
      </FooterLinks>
    </Container>
  );
};

export default Footer;
