import { useLocation } from 'react-router-dom';
import LinkButton from '@atoms/LinkButton';
import { PageTitle, SubTitle } from '@styles/ApaymentStyles';
import { StepBox, LeftBox, RightBox } from './App1Start';
import { tInfoState, sbtInfoState } from '@states/paymentState';
import { userEmail } from '@states/userState';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { format } from 'date-fns';

const ContentContainer = styled('div')`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 20px;
  position: relative;
`;

const PosterImg = styled('img')`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 5px solid ${colors.primary40};
`;

const Back = styled('div')`
  width: 100%;
  height: 70%;
  border-radius: 25%;
  position: absolute;
  z-index: -3;
  filter: blur(60px);
  background-color: gray;
`;

const ContentWrapper = styled('span')`
  font-size: 17px;
  font-weight: 500;
  color: ${colors.primary40};
`;

export const App4Done = ({ data, inactiveId }) => {
  const location = useLocation();
  const payedData = location.state?.payedData;
  console.log('payedData', payedData);

  const ticketInfo = useRecoilValue(tInfoState);
  const sbtInfo = useRecoilValue(sbtInfoState);
  const userEmailInfo = useRecoilValue(userEmail);

  const { tDeadline, tPrice, tTokenPrice, tSeat } = ticketInfo;
  const { sbtImage, sbtName } = sbtInfo;

  return (
    <StepBox>
      <LeftBox>
        <PageTitle>결제가 완료되었습니다.</PageTitle>
        <SubTitle>| 결제 정보 |</SubTitle>
        <ContentContainer>
          <Back />
          <PosterImg src={sbtImage} />
          <ContentWrapper>⭐ 티켓: {sbtName}</ContentWrapper>
          <ContentWrapper>
            ⭐ 날짜: {format(new Date(tDeadline), 'yyyy.MM.dd HH:mm')}
          </ContentWrapper>
          <ContentWrapper>⭐ 현금 가격: {tPrice}원</ContentWrapper>
          <ContentWrapper>⭐ 코인 가격: {tTokenPrice.toFixed(2)}MATIC</ContentWrapper>
          <ContentWrapper>⭐ 자리: {tSeat.map((seat) => `[${seat}] `)}</ContentWrapper>
          <ContentWrapper>⭐ 본인 이메일: {userEmailInfo}</ContentWrapper>
          {(inactiveId || inactiveId !== 0) && (
            <ContentWrapper>⭐ 사전예매에 사용한 티켓 ID: {inactiveId}</ContentWrapper>
          )}
        </ContentContainer>
      </LeftBox>
      <RightBox style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LinkButton to="/account" name="티켓 확인" />
      </RightBox>
    </StepBox>
  );
};
