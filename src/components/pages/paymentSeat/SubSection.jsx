import React from 'react';
import { Group, Text } from 'react-konva';
import Seat from './Seat';

const SubSection = ({
  width,
  x,
  y,
  data,
  onHoverSeat,
  onSelectSeat,
  onDeselectSeat,
  selectedSeatsIds,
}) => {
  return (
    <Group x={x} y={y}>
      {Object.keys(data.seats_by_rows).map((rowKey, rowIndex) => {
        const row = data.seats_by_rows[rowKey];
        return (
          <React.Fragment key={rowKey}>
            {row.map((seat, seatIndex) => {
              return (
                <Seat
                  key={seat.name}
                  x={seatIndex * 62}
                  y={rowIndex * 38}
                  data={seat}
                  onHover={onHoverSeat}
                  onSelect={onSelectSeat}
                  onDeselect={onDeselectSeat}
                  isSelected={selectedSeatsIds.indexOf(seat.name) >= 0}
                />
              );
            })}
            <Text
              text={rowKey}
              x={-12}
              y={10 + rowIndex * 38}
              fontSize={12}
              key={'label-left' + rowKey}
            />
          </React.Fragment>
        );
      })}
      {data.seats_by_rows[1].map((_, seatIndex) => {
        return (
          <Text
            text={(seatIndex + 1).toString()}
            x={seatIndex * 63 + 20}
            y={110}
            key={'label-bottom' + seatIndex}
            align="center"
          />
        );
      })}
      <Text
        text={data.name}
        align="center"
        y={-28}
        x={76}
        fontFamily={('Shrikhand', 'cursive')}
        fontSize={20}
      />
    </Group>
  );
};

export default SubSection;
