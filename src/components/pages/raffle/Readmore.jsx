import React, { forwardRef } from 'react';
import * as colors from '@styles/colors';
import { Column } from '@atoms/wrapper.style';
import Anchor from '@atoms/Anchor';
import { BlockTitle } from './Raffle.style';
import styled from 'styled-components';

const Readmore = forwardRef((props, ref) => {
  return (
    <Container>
      <Anchor ref={ref} />
      <BlockTitle>ReadMore</BlockTitle>
      <BoxView>
        <Column marginBottom="72px">
          <div className="readmore-title">
            참여가능 토큰 리스트{' '}
            <span className="readmore-detail">
              (해당 래플은 아래 토큰 보유자를 대상으로 하는 이벤트입니다.)
            </span>
          </div>
          <Column>
            <span className="readmore-text">
              - 2022 펭수 연말 펭미팅{' '}
              <span className="readmore-detail">
                hostAddress: 0xA4C40d1568E1a4a94B0b4E9b787190bF529934d3
              </span>
            </span>
            <span className="readmore-text">
              - 2022년 임재범 전국투어 콘서트 - 수원{' '}
              <span className="readmore-detail">
                hostAddress: 0xa2e8166DC2341457779E82A1677362A9fd4a9b79
              </span>
            </span>
            <span className="readmore-text">
              - 푸에르자부르타 웨이라 인 서울 월드투어(2022){' '}
              <span className="readmore-detail">
                hostAddress: 0x909304Ea4C5eF2696e581B24a112BFa0672b7dF4
              </span>
            </span>
            <span className="readmore-text">
              - 잔나비 전국투어 [판타스틱 올드 패션드 송년회] - 천안{' '}
              <span className="readmore-detail">
                hostAddress: 0x34684e61e4C5dd15dc0aAB63F50e2dCf6E76F4Fb
              </span>
            </span>
            <span className="readmore-text">
              - 2023 김연자 라이브 콘서트 - 대구{' '}
              <span className="readmore-detail">
                hostAddress: 0x8c48ADb5Ee88Da5a8f58289411DCD21Bc478eDEC
              </span>
            </span>
          </Column>
        </Column>
        <Column>
          <div className="readmore-title">공정성 준수</div>
          <span className="readmore-text">
            - 또트 래플은 공정성 준수를 위해 폴리곤 네트워크의 컨트랙트에서 실행되며 아래링크에서
            참여코드를 통해
            <br /> 코드와 내역을 확인 하실수 있습니다.
            <ALink
              target="_blank"
              rel="noreferrer"
              href="https://mumbai.polygonscan.com/address/0x5f9Bf7fd91c037F52E6BD89d1e59697770211492#readContract"
            >
              {'>>'} 래플내역 확인하기
            </ALink>
          </span>
        </Column>
      </BoxView>
    </Container>
  );
});

const Container = styled('div')`
  position: relative;
  width: 100%;
`;

const BoxView = styled('div')`
  border: 1px solid white;
  padding: 64px 32px;
  border-radius: 20px;
  width: 100%;
  font-size: 28px;

  & .readmore-title {
    font-size: 32px;
    margin-bottom: 28px;
    color: ${colors.primary80};
  }

  & .readmore-detail {
    color: gray;
    font-size: 16px;
  }

  & .readmore-text {
    margin-left: 24px;
    line-height: 32px;
  }
`;

const ALink = styled('a')`
  color: ${colors.primary40};
  margin-left: 16px;
  font-size: 16px;
`;

export default Readmore;
