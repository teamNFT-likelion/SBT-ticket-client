import React from 'react';
import LinkButton from '@atoms/LinkButton';
import useHover from '@hooks/useHover';
import { format } from 'date-fns';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import PreTicketingPeriod from '@utils/PreTicketingPeriod';
import DisabledButton from '@components/atoms/DisabledButton';

const Container = styled('div')`
  position: relative;
  max-width: 300px;
  border: 0.5px solid gray;
  border-radius: 20px;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const HoverWrapper = styled('div')`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  gap: 16px;
  align-items: center;
  background-color: rgba(219, 233, 175, 0.3);
  border-radius: 20px;
`;

const TicketImg = styled('img')`
  width: 100%;
  height: auto;
  border: 3px solid
    ${(props) =>
      props.preTicketing === '진행중' && props.prePossible ? colors.primary80 : '#ffffff0'};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

const TitleWrapper = styled('div')`
  width: 100%;
  font-size: 24px;
  overflow: hidden;
  white-space: wrap;
  word-break: keep-all;
  flex: 1;
  display: flex;
  align-items: center;
  line-height: 30px;
`;

const DateWrapper = styled('div')`
  color: ${colors.textSecondary};
  font-size: 18px;
  margin-top: 16px;
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
      return (
        <LinkButton
          to={`/payment?id=${dataId}`}
          name="사전예매"
          connectCheck={true}
          color={colors.primary40}
        />
      );
    } else if (PreTicketingPeriod(preTicketing) === '전') {
      return <DisabledButton name="사전예매" />;
    } else if (!prePossible && PreTicketingPeriod(preTicketing) === '진행중') {
      return <DisabledButton name="사전예매" />;
    } else {
      return (
        <LinkButton
          to={`/payment?id=${dataId}`}
          name="예매하기"
          connectCheck={true}
          color={colors.primary40}
        />
      );
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
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'end',
          flex: 1,
        }}
      >
        <TitleWrapper>
          {(PreTicketingPeriod(preTicketing)
            ? `[사전예매 ${PreTicketingPeriod(preTicketing)}] `
            : '') + title}
        </TitleWrapper>
        <DateWrapper>
          {format(new Date(startDate), 'yyyy.MM.dd')} ~ {format(new Date(endDate), 'yyyy.MM.dd')}
        </DateWrapper>
      </div>
    </Container>
  );
};

export default PosterItem;
