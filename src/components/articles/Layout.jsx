import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@articles/Header';
import Footer from '@articles/Footer';
import { Column } from '@atoms/wrapper.style';
import { APP_MAX_W, APP_HEADER_H, FOOTER_H, FOOTER_MT } from '@constants/styleConst';

const Layout = ({ children, page }) => {
  const [viewHeader, setViewHeader] = useState(true);
  const targetRef = useRef(null);

  useEffect(() => {
    if (!targetRef.current) {
      return;
    }

    function handleHeader(entries) {
      if (!entries[0].isIntersecting && page === 'a-payment-page') {
        setViewHeader(false);
      } else {
        setViewHeader(true);
      }
    }

    const target = targetRef.current;

    const observer = new IntersectionObserver(handleHeader, {
      root: null,
      threshold: 0.4,
    });
    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [page]);

  return (
    <Column alignItems="center">
      <Observer ref={targetRef}></Observer>
      <Header isHide={!viewHeader} page={page} />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </Column>
  );
};

const ContentWrapper = styled('div')`
  width: ${APP_MAX_W}px;
  margin-top: ${APP_HEADER_H};
  min-height: calc(100vh - ${APP_HEADER_H} - ${FOOTER_H}px - ${FOOTER_MT}px);
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Observer = styled('div')`
  width: 30px;
  height: ${APP_HEADER_H};
  position: absolute;
  top: 0;
  left: 500;
`;

export default Layout;
