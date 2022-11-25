import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    title: '뮤지컬 <랭보>',
    place: '대학로 TOM 1관',
    cashPrice: 9000,
    tokenPrice: 0.04,
    ageLimit: 19,
    startDate: 1666018800000,
    endDate: 1672498800000,
    dateInfo: {
      '2022-09-01': { startTime: '9시 30분', seatCount: 12 },
      '2022-09-02': { startTime: '10시 30분', seatCount: 5 },
      '2022-09-03': { startTime: '23시 30분', seatCount: 8 },
    },
  },
  {
    id: '343d3182-c273-4ea1-b2c9-6ace189013c6',
    topic: '전시',
    posterImgUrl:
      'https://image.toast.com/aaaaab/ticketlink/TKL_8/poster(220915)b.jpg',
    title: '뮤지컬 <랭보>',
    place: '대학로 TOM 1관',
    cashPrice: 9000,
    tokenPrice: 0.04,
    ageLimit: 19,
    startDate: 1666018800000,
    endDate: 1672498800000,
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
              <Title>2022 god [ON]</Title>
              <Info marginTop="80px">2022.12.09 ~ 2022.12.11</Info>
              <Info>KSPO DOME(올림픽체조경기장)</Info>
              <Info marginTop="50px">만 7세 이상 관람가능</Info>
              <Info marginTop="30px">CAST : 지오디</Info>
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
              <Title>2022 god [ON]</Title>
              <Info marginTop="80px" alignSelf="end">
                2022.12.09 ~ 2022.12.11
              </Info>
              <Info alignSelf="end">KSPO DOME(올림픽체조경기장)</Info>
              <Info marginTop="50px" alignSelf="end">
                만 7세 이상 관람가능
              </Info>
              <Info marginTop="30px" alignSelf="end">
                CAST : 지오디
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
