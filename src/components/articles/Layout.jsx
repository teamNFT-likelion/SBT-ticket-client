import React from 'react';
import styled from 'styled-components';
import Header from '@articles/Header';
import Footer from '@articles/Footer';
import { Column } from '@atoms/wrapper.style';
import {
  APP_MAX_W,
  APP_HEADER_H,
  FOOTER_H,
  FOOTER_MT,
} from '@constants/styleConst';

const ContentWrapper = styled('div')`
  width: ${APP_MAX_W}px;
  padding: 0 20px;
  margin-top: ${APP_HEADER_H};
  min-height: calc(100vh - ${APP_HEADER_H} - ${FOOTER_H}px - ${FOOTER_MT}px);
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Layout = ({ children, page }) => {
  return (
    <Column alignItems="center">
      <Header page={page} />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </Column>
  );
};

export default Layout;
