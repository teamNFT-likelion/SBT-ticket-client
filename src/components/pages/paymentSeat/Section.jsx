import React, { memo, useRef, useEffect } from 'react';
import { Rect, Group, Text } from 'react-konva';
import SubSection from './SubSection';
import { SECTION_TOP_PADDING, getSectionWidth } from './layout';

export default memo(
  ({ section, height, x, y, onHoverSeat, onSelectSeat, onDeselectSeat, selectedSeatsIds }) => {
    const containerRef = useRef();

    // caching will boost rendering
    // we just need to recache on some changes
    useEffect(() => {
      containerRef.current.cache();
    }, [section, selectedSeatsIds]);

    const width = getSectionWidth(section);
    let lastSubsectionX = 200;

    return (
      <Group y={y} x={x} ref={containerRef}>
        <Rect
          width={890}
          height={170}
          fill={'white'}
          strokeWidth={1}
          stroke="black"
          cornerRadius={10}
        />
        <Text
          text={`${section.name}_seat`}
          width={width}
          fontSize={24}
          x={20}
          y={77}
          fill="black"
          fontFamily={('sans-serif', 'Roboto Condensed', 'Do Hyeon')}
        />
        {section.subsections.map((subsection) => {
          const pos = lastSubsectionX;
          lastSubsectionX += 240; //3*3 간격

          return (
            <SubSection
              x={pos}
              y={SECTION_TOP_PADDING}
              key={subsection.name}
              data={subsection}
              width={500}
              height={height}
              onHoverSeat={onHoverSeat}
              onSelectSeat={onSelectSeat}
              onDeselectSeat={onDeselectSeat}
              selectedSeatsIds={selectedSeatsIds}
            />
          );
        })}
      </Group>
    );
  },
);
