import React from 'react';
import LinkButton from '@atoms/LinkButton';
import useHover from '@hooks/useHover';
import { format } from 'date-fns';
import styled from 'styled-components';
import * as colors from '@styles/colors'

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const HoverWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 85%;
  justify-content: center;
  gap: 16px;
  align-items: center;
  position: absolute;
  background-color: rgba(219, 233, 175, 0.5);
`;

const TicketImg = styled('img')`
  width: 200px;
  flex: 4;
`;

const TitleWrapper = styled('div')`
  font-size: 18px;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 5px 0;
`;

const DateWrapper = styled('div')`
  color: ${colors.textSecondary};
`


const PosterItem = ({ dataId, posterImgUrl, title, startDate, endDate }) => {
  const [hoverRef, isHover] = useHover();
  return (
    <Container ref={hoverRef}>
      {isHover && (
        <HoverWrapper>
          <LinkButton to={`/detail?id=${dataId}`} name="상세정보" />
          <LinkButton to={`/getInfo?id=${dataId}`} name="예매하기" />
        </HoverWrapper>
      )}
      <TicketImg src={posterImgUrl} />
      <TitleWrapper>{title}</TitleWrapper>
      <DateWrapper>
        {format(new Date(startDate), 'yyyy.MM.dd')} ~
        {format(new Date(endDate), 'yyyy.MM.dd')}
      </DateWrapper>
    </Container>
  );
};

export default PosterItem;
