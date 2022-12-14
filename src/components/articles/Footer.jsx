import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsTwitter, BsYoutube, BsDiscord } from 'react-icons/bs';
import * as colors from '@styles/colors';
import ttotLogo from '@assets/img/logo_ttot.png';
import { FOOTER_H, FOOTER_MT } from '@constants/styleConst';

const Container = styled('div')`
  width: 100%;
  height: ${FOOTER_H}px;
  padding: 20px;
  background-color: black;
  margin-top: ${FOOTER_MT}px;
`;
const TtotLogoImage = styled('img')`
  height: 30px;
`;
const EmojiWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const EmojiButton = styled('button')`
  color: ${colors.primary80};
  font-size: 30px;
  cursor: pointer;
`;
const FooterHeadContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
`;
const FooterTextContainer = styled('div')`
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
`;
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
`;

const Divider = () => {
  return (
    <svg width={1} height={12} viewBox="0 0 1 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width={1} height={12} fill="#3F3F46" />
    </svg>
  );
};

const Footer = () => {
  return (
    <Container>
      <FooterHeadContainer>
        <Link to={'/'}>
          <TtotLogoImage src={ttotLogo} />
        </Link>
        <EmojiWrapper>
          <EmojiButton
            onClick={() => {
              window.open('https://twitter.com/');
            }}
          >
            <BsTwitter />
          </EmojiButton>
          <EmojiButton
            onClick={() => {
              window.open('https://www.youtube.com/');
            }}
          >
            <BsYoutube />
          </EmojiButton>
          <EmojiButton
            onClick={() => {
              window.open('https://discord.com/');
            }}
          >
            <BsDiscord />
          </EmojiButton>
        </EmojiWrapper>
      </FooterHeadContainer>
      <FooterTextContainer>
        <FooterText>????????????????????? ???????????? ?????? 1???</FooterText>
        <FooterText>1???</FooterText>
        <FooterText>TEAM NFT</FooterText>
      </FooterTextContainer>
      <FooterTextContainer>
        <FooterText>&copy; TTOT. 2022. All rights reserved</FooterText>
      </FooterTextContainer>
      <FooterLinks>
        <FooterText>????????????</FooterText>
        <Divider />
        <FooterText>????????????????????????</FooterText>
        <Divider />
        <FooterText>??????????????????</FooterText>
      </FooterLinks>
    </Container>
  );
};

export default Footer;
