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
              - 블랙핑크 월드투어(2022){' '}
              <span className="readmore-detail">
                hostAddress: 0xB3449203badb6579c8938C7CB6850261351C9220
              </span>
            </span>
            <span className="readmore-text">
              - 푸에르자부르타 웨이라 인 서울 월드투어(2022){' '}
              <span className="readmore-detail">
                hostAddress: 0xB3449203badb6579c8938C7CB6850261351C9220
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
              href="https://mumbai.polygonscan.com/address/0x4d48eecc13cdb0f330b33a4eb132572cc5ff4ac2#readContract"
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
