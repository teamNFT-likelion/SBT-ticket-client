import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import items from './items.json'
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

const BigPoster = () => {
  const [activePosterId, setActivePosterId] = useState(0);
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

  return (
    <BigPosterWrapper>
      <PosterCard isOpen={activePosterId !== 2} flexDirection="row-reverse">
        <ImgCard
          src={items[0].posterImgUrl}
          alt="aa"
          onClick={() => onClickCard('left')}
        />
        <DescCard isOpen={activePosterId === 1}>
          <div className="card-box">
            <InfoWrapper>
              <Title>{items[0].title}</Title>
              <Info marginTop="80px">
                {format(new Date(items[0].startDate), 'yyyy.MM.dd')} ~
                {format(new Date(items[0].endDate), 'yyyy.MM.dd')}
              </Info>
              <Info>{items[0].place}</Info>
              <Info marginTop="50px">{items[0].viewAgeName} 관람가능</Info>
              <Info marginTop="30px">CAST : {items[0].cast}</Info>
            </InfoWrapper>
            <ButtonWrapper>
              <button onClick={() => navigate('/detail')}>상세정보</button>
              <button onClick={() => navigate('/payment')}>예매하기</button>
            </ButtonWrapper>
          </div>
        </DescCard>
      </PosterCard>
      <PosterCard isOpen={activePosterId !== 1}>
        <ImgCard
          src={items[1].posterImgUrl}
          alt="aa"
          onClick={() => onClickCard('right')}
        />
        <DescCard isOpen={activePosterId === 2}>
          <div className="card-box">
            <InfoWrapper>
              <Title>{items[1].title}</Title>
              <Info marginTop="80px" alignSelf="end">
                {format(new Date(items[1].startDate), 'yyyy.MM.dd')} ~
                {format(new Date(items[1].endDate), 'yyyy.MM.dd')}
              </Info>
              <Info alignSelf="end">{items[1].place}</Info>
              <Info marginTop="50px" alignSelf="end">
                {items[1].viewAgeName} 관람가능
              </Info>
              <Info marginTop="30px" alignSelf="end">
                CAST : {items[1].cast}
              </Info>
            </InfoWrapper>
            <ButtonWrapper>
              <button onClick={() => navigate('/detail')}>상세정보</button>
              <button onClick={() => navigate('/payment')}>예매하기</button>
            </ButtonWrapper>
          </div>
        </DescCard>
      </PosterCard>
    </BigPosterWrapper>
  );
};

export default BigPoster;
