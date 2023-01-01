import React from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { Row, Column } from '@atoms/wrapper.style';
import { AiOutlineUser } from 'react-icons/ai';
import { CiWallet } from 'react-icons/ci';
import { GiCardRandom } from 'react-icons/gi';
import { MdDescription } from 'react-icons/md';
import { BiBarcodeReader } from 'react-icons/bi';

const Guide = () => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <GuideDesc>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: colors.bgBlack,
            padding: '0 60px',
            gap: '4px',
          }}
        >
          <span>
            기존 팬분들에게 공정한 기회와 편의를 제공하고자 도입한 온라인 추첨 제도 입니다.
          </span>
          <span>당첨되신 주소에는 ttot를 통해 티켓으로 활용가능한 토큰이 발행됩니다</span>
        </div>
      </GuideDesc>
      <div
        style={{
          display: 'flex',
          border: '1px solid white',
          padding: '100px 32px 32px',
          borderRadius: '20px',
          gap: '32px',
        }}
      >
        <GuideItem>
          <IconWrapper>
            <CiWallet size="40px" color={colors.primary80} />
          </IconWrapper>
          <Column alignItems="center">
            <span className="guide_title">지갑연결</span>
            <span className="guide_desc">ttot웹에서 지갑을 연결하세요.</span>
          </Column>
        </GuideItem>
        <GuideItem>
          <IconWrapper>
            <BiBarcodeReader size="40px" color={colors.primary80} />
          </IconWrapper>
          <Column alignItems="center">
            <span className="guide_title">참여코드 확인</span>
            <span className="guide_desc">
              참여하고자 하는 래플의 <br />
              참여코드를 확인하세요.
            </span>
          </Column>
        </GuideItem>
        <GuideItem>
          <IconWrapper>
            <MdDescription size="40px" color={colors.primary80} />
          </IconWrapper>
          <Column alignItems="center">
            <span className="guide_title">대상토큰 확인</span>
            <span className="guide_desc">
              ReadMore에서 참여가능한 <br />
              토큰 목록을 확인하세요.
            </span>
          </Column>
        </GuideItem>
        <GuideItem>
          <IconWrapper>
            <AiOutlineUser size="40px" color={colors.primary80} />
          </IconWrapper>
          <Column alignItems="center">
            <span className="guide_title">응모하기</span>
            <span className="guide_desc">
              마이페이지내 만료된 토큰 사용하기를 통해 래플 참여코드를 입력하고 응모하세요.
            </span>
          </Column>
        </GuideItem>
        <GuideItem>
          <IconWrapper>
            <GiCardRandom size="40px" color={colors.primary80} />
          </IconWrapper>
          <Column alignItems="center">
            <span className="guide_title">결과안내</span>
            <span className="guide_desc">
              당첨시 민팅되어 마이페이지에서 <br />
              확인가능하며 목록은 폴리곤스캔에서 확인하실수있습니다.
            </span>
          </Column>
        </GuideItem>
      </div>
    </div>
  );
};

export default Guide;

const IconWrapper = styled('div')`
  border: 1px solid ${colors.primary80};
  width: 62px;
  height: 62px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const GuideDesc = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 44px;
  font-size: 24px;
  gap: 4px;
  position: absolute;
  top: -22px;
  width: 100%;
`;

const GuideItem = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .guide_title {
    font-size: 20px;
    margin-bottom: 8px;
  }

  & .guide_desc {
    font-size: 15px;
    margin-bottom: 6px;
    color: gray;
    text-align: center;
  }
`;
