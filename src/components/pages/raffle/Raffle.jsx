import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import raffle from '@assets/img/raffle_2.jpg';
import { useCountdown } from '@hooks/useCountdown';
import { ShowCountDown } from '@utils/parser';
import { useRaffleContract } from '@hooks/useRaffleContract';
import useWeb3 from '@hooks/useWeb3';
import { Column } from '@atoms/wrapper.style';
import { BlockTitle } from './Raffle.style';

const Raffle = ({ handleScrollByRef }) => {
  const targetDate = new Date('2023-03-03');
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  const [inputList, setInputList] = useState([]);
  const { web3 } = useWeb3();
  const { getInputList } = useRaffleContract(web3);

  useEffect(() => {
    getInputList('A1DMKBNZI55', (res) => setInputList(res));
  }, [getInputList]);

  return (
    <Column>
      <BlockTitle>Raffle</BlockTitle>
      <Container>
        <ImageWrapper>
          <img src={raffle} alt="raffle-img" />
          <RaffleTitle>
            Web3 Monkey Concert <br />
            Grand Opening
          </RaffleTitle>
          <Participating>{inputList.length} 명 참여중</Participating>
        </ImageWrapper>
        <CodeWrapper>
          <div className="remain-time">
            <ShowCountDown
              days={Number(days)}
              hours={Number(hours)}
              minutes={Number(minutes)}
              seconds={Number(seconds)}
            />
          </div>
          <div>참여코드</div>
          <div className="code-box">A1DMKBNZI55</div>
          <div className="code-desc">
            공연 sbt 보유자 전용 래플 상품입니다.{' '}
            <span onClick={handleScrollByRef}>자세히보기</span>
          </div>
        </CodeWrapper>
      </Container>
    </Column>
  );
};

const Container = styled('div')`
  display: flex;
  gap: 16px;
`;

const RaffleTitle = styled('div')`
  position: absolute;
  top: 24px;
  right: 24px;
  text-align: right;
  color: rgba(239, 239, 240, 0.5);
  font-size: 40px;
`;

const Participating = styled('div')`
  position: absolute;
  padding: 16px 32px;
  right: 24px;
  bottom: 24px;
  border: 1px solid ${colors.primary80};
  color: ${colors.primary80};
  font-size: 32px;
`;

const ImageWrapper = styled('div')`
  position: relative;
  flex: 1;

  & > img {
    width: 100%;
    border-radius: 20px;
  }
`;

const CodeWrapper = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(239, 239, 240, 0.5);
  color: white;
  border-radius: 20px;
  font-size: 28px;

  & .remain-time {
    font-size: 70px;
    color: ${colors.primary80};
    margin-bottom: 30px;
  }

  & .code-box {
    padding: 10px 56px;
    background-color: ${colors.primary80};
    color: gray;
    margin: 12px 0 6px;
  }

  & .code-desc {
    font-size: 14px;

    & > span {
      text-decoration: underline;
      font-size: 12px;
      cursor: pointer;
    }
  }
`;

export default Raffle;
