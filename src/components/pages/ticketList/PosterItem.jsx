import React from 'react';
import LinkButton from '@atoms/LinkButton';
import useHover from '@hooks/useHover';
import { format } from 'date-fns';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import PreTicketingPeriod from '@utils/PreTicketingPeriod';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const HoverWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  border: 3px solid
    ${(props) =>
      props.preTicketing === '진행중' && props.prePossible ? colors.primary80 : '#ffffff0'};
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
`;

const DisabledButtonWrapper = styled('button')`
  background-color: #526600;
  color: white;
  width: 100px;
  height: 64px;
  font-size: 20px;
  border-radius: 5px;
  margin: 3px;
  cursor: pointer;
  opacity: 0.8;
`;

const PosterItem = ({
  dataId,
  posterImgUrl,
  title,
  startDate,
  endDate,
  preTicketing,
  prePossible,
}) => {
  const [hoverRef, isHover] = useHover();

  const Button = () => {
    if (prePossible && PreTicketingPeriod(preTicketing) === '진행중') {
      return <DisabledButtonWrapper disabled>사전예매</DisabledButtonWrapper>;
    } else if (PreTicketingPeriod(preTicketing) === '전') {
      return <DisabledButtonWrapper disabled>사전예매</DisabledButtonWrapper>;
    } else {
      return <LinkButton to={`/payment?id=${dataId}`} name="예매하기" connectCheck={true} />;
    }
  };

  return (
    <Container ref={hoverRef}>
      {isHover && (
        <HoverWrapper>
          <LinkButton to={`/detail?id=${dataId}`} name="상세정보" prePossible={prePossible} />
          <Button />
        </HoverWrapper>
      )}
      <TicketImg
        src={posterImgUrl}
        preTicketing={PreTicketingPeriod(preTicketing)}
        prePossible={prePossible}
      />
      <TitleWrapper>
        {(PreTicketingPeriod(preTicketing)
          ? `[사전예매 ${PreTicketingPeriod(preTicketing)}] `
          : '') + title}
      </TitleWrapper>
      <DateWrapper>
        {format(new Date(startDate), 'yyyy.MM.dd')} ~{format(new Date(endDate), 'yyyy.MM.dd')}
      </DateWrapper>
    </Container>
  );
};

export default PosterItem;
