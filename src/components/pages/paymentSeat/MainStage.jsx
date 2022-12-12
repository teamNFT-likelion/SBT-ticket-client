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

const SeatsInfoBox = styled(Column)`
  height: 100px;
  width: 700px;
  border: white 4px solid;
  border-bottom: none;
  padding: 10px;
  justify-content: center;
`;

const SeatsInfo = styled('span')`
  font-size: 20px;
  font-weight: 400;
  color: ${colors.primary80};
`;

const SeatsSelectBox = styled(Column)`
  height: auto;
  width: 700px;
  border: white 4px solid;
`;

const Container = styled('div')`
  position: relative;
  width: 693px;
  height: 400px;
`;

const MainStage = ({ setSelectedSeats, setSelectedPrices }) => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  const [scale, setScale] = useState(1);
  const [scaleToFit, setScaleToFit] = useState(1);
  const [size, setSize] = useState({
    width: 600,
    height: 800,
    virtualWidth: 1000,
  });
  const [virtualWidth, setVirtualWidth] = useState(1000);
  const [selectedSeatsIds, setSelectedSeatsIds] = useState([]);
  const [selectedSeatsPrice, setSelectedSeatsPrice] = useState(0);
  const seatsLimit = 2;
  const [popup, setPopup] = useState({ seat: null });

  useEffect(() => {
    setSelectedSeats(selectedSeatsIds);
    setSelectedPrices(selectedSeatsPrice);
  }, [selectedSeatsIds, selectedSeatsPrice]);

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
  }, [SeatsData, size]);

  // togle scale on double clicks or taps
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
      if (selectedSeatsIds.length < seatsLimit) {
        const newIds = selectedSeatsIds.concat([seatId]);
        setSelectedSeatsIds(newIds);
        if (seatId.includes(SeatsData.seats.sections[0].name)) {
          setSelectedSeatsPrice(
            (price) => price + SeatsData.seats.sections[0].price,
          );
        } else if (seatId.includes(SeatsData.seats.sections[1].name)) {
          setSelectedSeatsPrice(
            (price) => price + SeatsData.seats.sections[1].price,
          );
        } else {
          setSelectedSeatsPrice(
            (price) => price + SeatsData.seats.sections[2].price,
          );
        }
      }
    },
    [selectedSeatsIds],
  );

  const handleDeselect = useCallback(
    (seatId) => {
      const ids = selectedSeatsIds.slice();
      ids.splice(ids.indexOf(seatId), 1);
      setSelectedSeatsIds(ids);
      if (seatId.includes(SeatsData.seats.sections[0].name)) {
        setSelectedSeatsPrice(
          (price) => price - SeatsData.seats.sections[0].price,
        );
      } else if (seatId.includes(SeatsData.seats.sections[1].name)) {
        setSelectedSeatsPrice(
          (price) => price - SeatsData.seats.sections[1].price,
        );
      } else {
        setSelectedSeatsPrice(
          (price) => price - SeatsData.seats.sections[2].price,
        );
      }
    },
    [selectedSeatsIds],
  );

  const maxSectionWidth = layout.getMaximumSectionWidth(
    SeatsData.seats.sections,
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
    <Column marginTop="24px" marginBottom="24px" height="auto">
      <SeatsInfoBox>
        <SeatsInfo>
          ⭐ 선택한 좌석: {selectedSeatsIds.map((seat) => `${seat}, `)}
        </SeatsInfo>
        <SeatsInfo>
          ⭐ 선택한 매수(개인당 최대{' '}
          <span style={{ color: 'red' }}>{seatsLimit}</span>매):{' '}
          {selectedSeatsIds.length}매
        </SeatsInfo>
        <SeatsInfo>⭐ 총 금액: {selectedSeatsPrice}원</SeatsInfo>
      </SeatsInfoBox>
      <SeatsSelectBox>
        <Container ref={containerRef}>
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
                const width = layout.getSectionWidth(section);
                const offset = (maxSectionWidth - width) / 2;

                return (
                  <Section
                    x={offset}
                    y={position}
                    height={height}
                    key={index}
                    section={section}
                    selectedSeatsIds={selectedSeatsIds}
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
        </Container>
      </SeatsSelectBox>
    </Column>
  );
};

export default MainStage;
