import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
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

const items = [
  {
    id: '343d3182-c273-4ea1-b2c9-6ace189013c6',
    topic: '전시',
    posterImgUrl:
      'https://image.toast.com/aaaaab/ticketlink/TKL_6/펭미팅_대표이미지_405X500.jpg',
    title: '2022 펭수 연말 펭미팅',
    place: '경희대학교 평화의전당',
    cashPrice: 59000,
    tokenPrice: 0.04,
    startDate: 1671807600000,
    endDate: 1671894000000,
    runningTime: 90,
    cast: '펭수',
    viewAgeName: '8세이상',
    dateInfo: {
      '2022-09-01': { startTime: '9시 30분', seatCount: 12 },
      '2022-09-02': { startTime: '10시 30분', seatCount: 5 },
      '2022-09-03': { startTime: '23시 30분', seatCount: 8 },
    },
  },
  {
    id: '343d3182-c273-4ea1-b2d9-6ace189013c6',
    topic: '전시',
    posterImgUrl:
      'https://image.toast.com/aaaaab/ticketlink/TKL_8/poster(220915)b.jpg',
    title: '2022 푸에르자부르타 웨이라 인 서울',
    place: '잠실종합운동장 FB씨어터',
    cashPrice: 121000,
    tokenPrice: 0.04,
    startDate: 1664377200000,
    endDate: 1671980400000,
    runningTime: 90,
    cast: '푸에르자부르타',
    viewAgeName: '8세이상',
    dateInfo: {
      '2022-09-01': { startTime: '9시 30분', seatCount: 12 },
      '2022-09-02': { startTime: '10시 30분', seatCount: 5 },
      '2022-09-03': { startTime: '23시 30분', seatCount: 8 },
    },
  },
];

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
