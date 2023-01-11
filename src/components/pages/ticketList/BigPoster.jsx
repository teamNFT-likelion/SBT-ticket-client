import React from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { ImgCard } from './BigPoster.style';
import { BigPosterInfo } from '@components/articles/BigPosterInfo';
import useItems from '@hooks/useItems';
import Slider from 'react-slick';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';

const BigPoster = () => {
  const { typeItems } = useItems();

  const Item1 = typeItems[typeItems.length - 1];
  const Item2 = typeItems[typeItems.length - 2];

  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 2,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <SliderWrapper>
      <Slider {...settings}>
        <div>
          <div className="poster-card">
            <BigPosterInfo Item={Item1} />
            <ImgCard src={Item1.posterImgUrl} alt="poster1" />
          </div>
        </div>
        <div>
          <div className="poster-card">
            <BigPosterInfo Item={Item2} />
            <ImgCard src={Item2.posterImgUrl} alt="poster2" />
          </div>
        </div>
      </Slider>
    </SliderWrapper>
  );
};

const SliderWrapper = styled('div')`
  width: 100%;

  & .slick-list {
    height: auto;
  }

  & .slick-slide {
    display: flex;
    width: 100%;
    border-radius: 30px;
    margin: 0;
    scale: 0.9;
    border: 1px solid white;

    & > div {
      width: 100%;
      display: flex;
    }
  }

  & .slick-slide.slick-center {
    scale: 1;
    transition: scale 1s ease-in-out;
    border: 3px solid gray;
  }

  & .slick-slider {
    position: relative;
  }

  & .poster-card {
    display: flex;
    justify-content: space-between;
  }
`;

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      style={{
        color: 'white',
        position: 'absolute',
        right: '-24px',
        top: 0,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <SlArrowRight size="30px" color={colors.primary80} style={{ cursor: 'pointer' }} />
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      style={{
        position: 'absolute',
        left: '-24px',
        top: 0,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <SlArrowLeft size="30px" color={colors.primary80} style={{ cursor: 'pointer' }} />
    </div>
  );
}

export default BigPoster;
