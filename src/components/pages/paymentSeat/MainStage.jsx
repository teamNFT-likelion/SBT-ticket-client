import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { Stage, Layer } from 'react-konva';
import LoadingSpinner from '@atoms/LoadingSpinner';
import { Column } from '@components/atoms/wrapper.style';
import Section from './Section';
import SeatPopup from './SeatPopup';
import * as layout from './layout';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { tSeatState, tPriceState, tDateState, tPartState } from '@states/paymentState';

const SeatsContainer = styled(Column)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SeatsInfo = styled('span')`
  font-size: 20px;
  font-weight: 400;
  color: ${colors.primary80};
  margin-bottom: 10px;
`;

//TODO: 색변경
const SeatsSelectBox = styled('div')`
  height: auto;
  display: flex;
  justify-content: center;
  border-radius: 24px;
  position: relative;
`;

const size = {
  width: 900,
  height: 570,
  virtualWidth: 1000,
};

const MainStage = ({ data }) => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const [popup, setPopup] = useState({ seat: null });
  const [seatIds, setSeatsIds] = useRecoilState(tSeatState);
  const setSeatsPrice = useSetRecoilState(tPriceState);
  const date = useRecoilValue(tDateState);
  const part = useRecoilValue(tPartState);
  const SeatsData = data.dateInfo[date.getTime()][part];

  const seatsLimit = 2;

  const handleHover = useCallback((seat, pos) => {
    setPopup({
      seat: seat,
      position: pos,
    });
  }, []);

  const handleSelect = useCallback(
    (seatId) => {
      if (seatIds.length < seatsLimit) {
        const newIds = seatIds.concat([seatId]);
        setSeatsIds(newIds);
        if (seatId.includes(SeatsData.seats.sections[0].name)) {
          setSeatsPrice((price) => price + SeatsData.seats.sections[0].price);
        } else if (seatId.includes(SeatsData.seats.sections[1].name)) {
          setSeatsPrice((price) => price + SeatsData.seats.sections[1].price);
        } else {
          setSeatsPrice((price) => price + SeatsData.seats.sections[2].price);
        }
      }
    },
    [SeatsData.seats.sections, seatIds, setSeatsIds, setSeatsPrice],
  );

  const handleDeselect = useCallback(
    (seatId) => {
      const ids = seatIds.slice();
      ids.splice(ids.indexOf(seatId), 1);
      setSeatsIds(ids);
      if (seatId.includes(SeatsData.seats.sections[0].name)) {
        setSeatsPrice((price) => price - SeatsData.seats.sections[0].price);
      } else if (seatId.includes(SeatsData.seats.sections[1].name)) {
        setSeatsPrice((price) => price - SeatsData.seats.sections[1].price);
      } else {
        setSeatsPrice((price) => price - SeatsData.seats.sections[2].price);
      }
    },
    [SeatsData.seats.sections, seatIds, setSeatsIds, setSeatsPrice],
  );

  if (SeatsData === null) {
    return (
      <div ref={containerRef}>
        <LoadingSpinner />
      </div>
    );
  }

  let lastSectionPosition = 0;

  return (
    <SeatsContainer>
      <SeatsInfo>
        ⭐ 선택한 매수(개인당 최대 <span style={{ color: colors.bgRed }}>{seatsLimit}</span> 매) :{' '}
        {seatIds.length} 매
      </SeatsInfo>
      <SeatsSelectBox ref={containerRef}>
        <Stage ref={stageRef} width={size.width} height={size.height}>
          <Layer>
            {SeatsData.seats.sections.map((section, index) => {
              const height = layout.getSectionHeight(section);
              const position = lastSectionPosition + layout.SECTIONS_MARGIN;
              lastSectionPosition = position + height;
              const offset = 5;

              return (
                <Section
                  x={offset}
                  y={position}
                  height={200}
                  width={800}
                  key={index}
                  section={section}
                  selectedSeatsIds={seatIds}
                  onHoverSeat={handleHover}
                  onSelectSeat={handleSelect}
                  onDeselectSeat={handleDeselect}
                />
              );
            })}
          </Layer>
        </Stage>
        {popup.seat && (
          <SeatPopup
            position={popup.position}
            seatId={popup.seat}
            onClose={() => {
              setPopup({ seat: null });
            }}
          />
        )}
      </SeatsSelectBox>
    </SeatsContainer>
  );
};

export default MainStage;
