import React from 'react';
import * as colors from '@styles/colors';
import { Column } from '@atoms/wrapper.style';

const Readmore = () => {
  return (
    <div
      style={{
        border: '1px solid white',
        padding: '64px 32px',
        borderRadius: '20px',
        width: '100%',
        fontSize: '28px',
      }}
    >
      <Column marginBottom="72px">
        <div style={{ fontSize: '32px', marginBottom: '28px', color: colors.primary80 }}>
          참여가능 토큰 리스트{' '}
          <span style={{ color: 'gray', fontSize: '16px' }}>
            (해당 래플은 아래 토큰 보유자를 대상으로 하는 이벤트입니다.)
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '24px', gap: '8px' }}>
          <span>
            - 블랙핑크 월드투어(2022){' '}
            <span style={{ color: 'gray', fontSize: '20px' }}>
              hostAddress: 0xB3449203badb6579c8938C7CB6850261351C9220
            </span>
          </span>
          <span>
            - 푸에르자부르타 웨이라 인 서울 월드투어(2022){' '}
            <span style={{ color: 'gray', fontSize: '20px' }}>
              hostAddress: 0xB3449203badb6579c8938C7CB6850261351C9220
            </span>
          </span>
        </div>
      </Column>
      <Column>
        <div style={{ fontSize: '32px', marginBottom: '28px', color: colors.primary80 }}>
          공정성 준수
        </div>
        <div style={{ marginLeft: '16px', lineHeight: '32px' }}>
          - 또트 래플은 공정성 준수를 위해 폴리곤 네트워크의 컨트랙트에서 실행되며 아래링크에서
          참여코드를 코드와 내역을 확인 하실수 있습니다.
          <a
            style={{ color: colors.primary40, marginLeft: '16px' }}
            target="_blank"
            rel="noreferrer"
            href="https://goerli.etherscan.io/address/0xb3449203badb6579c8938c7cb6850261351c9220#readContract"
          >
            {'>>'} 래플내역 확인하기
          </a>
        </div>
      </Column>
    </div>
  );
};

export default Readmore;
