import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { parseItemType } from '@utils/parser';
import {
  BigPosterWrapper,
  PosterCard,
  ImgCard,
  DescCard,
  InfoWrapper,
  Title,
  Info,
  ButtonWrapper,
  PreTicketingInfo,
} from './BigPoster.style';
import { walletConnectError } from '@utils/toastMessages';
import { useRecoilValue } from 'recoil';
import { userState } from '@states/userState';
import PreTicketingPeriod from '@utils/PreTicketingPeriod';
import * as colors from '@styles/colors';

const BigPoster = ({ type, items }) => {
  const [activePosterId, setActivePosterId] = useState(0);
  const [typeItems, setTypeItems] = useState(items);
  const navigate = useNavigate();

  const { account } = useRecoilValue(userState);

  const onClickCard = (side) => {
    if (activePosterId === 0 && side === 'right') {
      setActivePosterId(2);
    } else if (activePosterId === 0 && side === 'left') {
      setActivePosterId(1);
    } else {
      setActivePosterId(0);
    }
  };

  useEffect(() => {
    let filteredList = items
      .filter((item) => item.topic === parseItemType(type))
      .map((prev) => {
        let cp = { ...prev, preTState: PreTicketingPeriod(prev.preTicketing) };
        console.log(cp.preTState);
        return cp;
      });

    setTypeItems(filteredList);
    setActivePosterId(0);
  }, [type, items]);

  return (
    <BigPosterWrapper>
      <PosterCard isOpen={activePosterId !== 2} flexDirection="row-reverse">
        <ImgCard src={typeItems[0].posterImgUrl} alt="aa" onClick={() => onClickCard('left')} />
        <DescCard isOpen={activePosterId === 1}>
          <div className="card-box">
            <InfoWrapper>
              <Title>
                <PreTicketingInfo style={{ color: colors.bgRed }}>
                  {typeItems[0].preTState ? `[사전예매 ${typeItems[0].preTState}]` : ''}
                </PreTicketingInfo>
                {typeItems[0].title}
              </Title>
              {typeItems[0].preTicketing[0] && (
                <PreTicketingInfo marginTop="30px">
                  {'사전예매기간 : ' + format(new Date(typeItems[0].preTicketing[0]), 'yyyy.MM.dd')}{' '}
                  ~{format(new Date(typeItems[0].preTicketing[1]), 'yyyy.MM.dd')}
                </PreTicketingInfo>
              )}
              <Info marginTop="50px">
                {format(new Date(typeItems[0].startDate), 'yyyy.MM.dd')} ~
                {format(new Date(typeItems[0].endDate), 'yyyy.MM.dd')}
              </Info>
              <Info>{typeItems[0].place}</Info>
              <Info marginTop="50px">{typeItems[0].viewAgeName} 관람가능</Info>
              <Info marginTop="30px">CAST : {typeItems[0].cast}</Info>
            </InfoWrapper>
            <ButtonWrapper>
              <button
                onClick={() => {
                  navigate({
                    pathname: '/detail',
                    search: `?id=${typeItems[0].id}`,
                  });
                }}
              >
                상세정보
              </button>
              {typeItems[0].preTState === '중' ? (
                <button
                  style={{ backgroundColor: colors.primary40 }}
                  onClick={() => {
                    if (account) {
                      navigate({
                        pathname: '/payment',
                        search: `?id=${typeItems[0].id}`,
                      });
                    } else {
                      walletConnectError();
                    }
                  }}
                >
                  사전예매
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (account) {
                      navigate({
                        pathname: '/payment',
                        search: `?id=${typeItems[0].id}`,
                      });
                    } else {
                      walletConnectError();
                    }
                  }}
                >
                  예매하기
                </button>
              )}
            </ButtonWrapper>
          </div>
        </DescCard>
      </PosterCard>
      <PosterCard isOpen={activePosterId !== 1}>
        <ImgCard src={typeItems[1].posterImgUrl} alt="aa" onClick={() => onClickCard('right')} />
        <DescCard isOpen={activePosterId === 2}>
          <div className="card-box">
            <InfoWrapper>
              <Title>
                <PreTicketingInfo style={{ color: colors.bgRed }}>
                  {typeItems[1].preTState ? `[사전예매 ${typeItems[1].preTState}]` : ''}
                </PreTicketingInfo>
                {typeItems[1].title}
              </Title>
              {typeItems[1].preTicketing[0] && (
                <PreTicketingInfo marginTop="30px">
                  {'사전예매기간 : ' + format(new Date(typeItems[1].preTicketing[0]), 'yyyy.MM.dd')}{' '}
                  ~{format(new Date(typeItems[1].preTicketing[1]), 'yyyy.MM.dd')}
                </PreTicketingInfo>
              )}
              <Info marginTop="50px">
                {format(new Date(typeItems[1].startDate), 'yyyy.MM.dd')} ~
                {format(new Date(typeItems[1].endDate), 'yyyy.MM.dd')}
              </Info>
              <Info>{typeItems[1].place}</Info>
              <Info marginTop="50px">{typeItems[1].viewAgeName} 관람가능</Info>
              <Info marginTop="30px">CAST : {typeItems[1].cast}</Info>
            </InfoWrapper>
            <ButtonWrapper>
              <button
                onClick={() => {
                  navigate({
                    pathname: '/detail',
                    search: `?id=${typeItems[0].id}`,
                  });
                }}
              >
                상세정보
              </button>
              {typeItems[1].preTState === '중' ? (
                <button
                  style={{ backgroundColor: colors.primary40 }}
                  onClick={() => {
                    if (account) {
                      navigate({
                        pathname: '/payment',
                        search: `?id=${typeItems[0].id}`,
                      });
                    } else {
                      walletConnectError();
                    }
                  }}
                >
                  사전예매
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (account) {
                      navigate({
                        pathname: '/payment',
                        search: `?id=${typeItems[0].id}`,
                      });
                    } else {
                      walletConnectError();
                    }
                  }}
                >
                  예매하기
                </button>
              )}
            </ButtonWrapper>
          </div>
        </DescCard>
      </PosterCard>
    </BigPosterWrapper>
  );
};

export default BigPoster;
