import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { Stage, Layer } from 'react-konva';
import LoadingSpinner from '@atoms/LoadingSpinner';
import { Column } from '@components/atoms/wrapper.style';
import Section from './Section';
import SeatPopup from './SeatPopup';
import SeatsData from './seats-data.json';
import * as layout from './layout';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { tSeatState, tPriceState } from '@states/paymentState';

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
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: gray;
  border-radius: 24px;
  position: relative;
`;

const MainStage = () => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [scaleToFit, setScaleToFit] = useState(1);
  const [size, setSize] = useState({
    width: 500,
    height: 800,
    virtualWidth: 1000,
  });
  const [virtualWidth, setVirtualWidth] = useState(1000);
  const [seatIds, setSeatsIds] = useRecoilState(tSeatState);
  const setSeatsPrice = useSetRecoilState(tPriceState);
  const seatsLimit = 2;
  const [popup, setPopup] = useState({ seat: null });

  // calculate available space for drawing
  useEffect(() => {
    const newSize = {
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    };
    if (newSize.width !== size.width || newSize.height !== size.height) {
      setSize(newSize);
    }
  }, [size]);

  // calculate initial scale
  useEffect(() => {
    if (!stageRef.current) {
      return;
    }
    const stage = stageRef.current;
    const clientRect = stage.getClientRect({ skipTransform: true });
    const scaleToFit = size.width / clientRect.width;

    setScale(scaleToFit);
    setScaleToFit(scaleToFit);
    setVirtualWidth(clientRect.width);
  }, [size]);

  // toggle scale on double clicks or taps
  const toggleScale = useCallback(() => {
    if (scale === 1) {
      setScale(scaleToFit);
    } else {
      setScale(1);
    }
  }, [scale, scaleToFit]);

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
    [seatIds, setSeatsIds, setSeatsPrice],
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
    [seatIds, setSeatsIds, setSeatsPrice],
  );

  // const maxSectionWidth = layout.getMaximumSectionWidth(
  //   SeatsData.seats.sections,
  // );

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
        ⭐ 선택한 매수(개인당 최대{' '}
        <span style={{ color: 'red' }}>{seatsLimit}</span>매): {seatIds.length}
        매
      </SeatsInfo>
      <SeatsSelectBox ref={containerRef}>
        <Stage
          ref={stageRef}
          width={size.width}
          height={size.height}
          draggable
          dragBoundFunc={(pos) => {
            pos.x = Math.min(
              size.width / 2,
              Math.max(pos.x, -virtualWidth * scale + size.width / 2),
            );
            pos.y = Math.min(
              size.height / 2,
              Math.max(pos.y, -size.height / 2),
            );
            return pos;
          }}
          onDblTap={toggleScale}
          onDblClick={toggleScale}
          scaleX={scale}
          scaleY={scale}
        >
          <Layer>
            {SeatsData.seats.sections.map((section, index) => {
              const height = layout.getSectionHeight(section);
              const position = lastSectionPosition + layout.SECTIONS_MARGIN;
              lastSectionPosition = position + height;
              // const width = layout.getSectionWidth(section);
              // const offset = (maxSectionWidth - width) / 2;
              const offset = 10;

              return (
                <Section
                  x={offset}
                  y={position}
                  height={height}
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
