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
} from './BigPoster.style';

const BigPoster = ({ type, items }) => {
  const [activePosterId, setActivePosterId] = useState(0);
  const [typeItems, setTypeItems] = useState(items);
  const navigate = useNavigate();

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
    const filteredList = items.filter(
      (item) => item.topic === parseItemType(type),
    );

    setTypeItems(filteredList);
    setActivePosterId(0);
  }, [type, items]);

  return (
    <BigPosterWrapper>
      <PosterCard isOpen={activePosterId !== 2} flexDirection="row-reverse">
        <ImgCard
          src={typeItems[0].posterImgUrl}
          alt="aa"
          onClick={() => onClickCard('left')}
        />
        <DescCard isOpen={activePosterId === 1}>
          <div className="card-box">
            <InfoWrapper>
              <Title>{typeItems[0].title}</Title>
              <Info marginTop="80px">
                {format(new Date(typeItems[0].startDate), 'yyyy.MM.dd')} ~
                {format(new Date(typeItems[0].endDate), 'yyyy.MM.dd')}
              </Info>
              <Info>{typeItems[0].place}</Info>
              <Info marginTop="50px">{typeItems[0].viewAgeName} 관람가능</Info>
              <Info marginTop="30px">CAST : {typeItems[0].cast}</Info>
            </InfoWrapper>
            <ButtonWrapper>
              <button
                onClick={() =>
                  navigate({
                    pathname: '/detail',
                    search: `?id=${typeItems[0].id}`,
                  })
                }
              >
                상세정보
              </button>
              <button
                onClick={() =>
                  navigate({
                    pathname: '/getInfo',
                    search: `?id=${typeItems[0].id}`,
                  })
                }
              >
                예매하기
              </button>
            </ButtonWrapper>
          </div>
        </DescCard>
      </PosterCard>
      <PosterCard isOpen={activePosterId !== 1}>
        <ImgCard
          src={typeItems[1].posterImgUrl}
          alt="aa"
          onClick={() => onClickCard('right')}
        />
        <DescCard isOpen={activePosterId === 2}>
          <div className="card-box">
            <InfoWrapper>
              <Title>{typeItems[1].title}</Title>
              <Info marginTop="80px" alignSelf="end">
                {format(new Date(typeItems[1].startDate), 'yyyy.MM.dd')} ~
                {format(new Date(typeItems[1].endDate), 'yyyy.MM.dd')}
              </Info>
              <Info alignSelf="end">{typeItems[1].place}</Info>
              <Info marginTop="50px" alignSelf="end">
                {typeItems[1].viewAgeName} 관람가능
              </Info>
              <Info marginTop="30px" alignSelf="end">
                CAST : {typeItems[1].cast}
              </Info>
            </InfoWrapper>
            <ButtonWrapper>
              <button
                onClick={() =>
                  navigate({
                    pathname: '/detail',
                    search: `?id=${typeItems[1].id}`,
                  })
                }
              >
                상세정보
              </button>
              <button
                onClick={() =>
                  navigate({
                    pathname: '/getInfo',
                    search: `?id=${typeItems[1].id}`,
                  })
                }
              >
                예매하기
              </button>
            </ButtonWrapper>
          </div>
        </DescCard>
      </PosterCard>
    </BigPosterWrapper>
  );
};

export default BigPoster;
