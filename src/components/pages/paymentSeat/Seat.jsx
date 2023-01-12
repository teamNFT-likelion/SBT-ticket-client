import React from 'react';
import { Rect } from 'react-konva';
import * as colors from '@styles/colors';

function getColor(isBooked, isSelected) {
  if (isSelected) {
    return 'orange';
  } else if (isBooked) {
    return 'lightgrey';
  } else {
    return colors.primary80;
  }
}

const Seat = (props) => {
  const isBooked = props.data.status === 'booked';

  return (
    <Rect
      x={props.x}
      y={props.y}
      width={50}
      height={30}
      stroke={colors.primary40}
      cornerRadius={5}
      fill={getColor(isBooked, props.isSelected)}
      strokeWidth={3}
      onMouseEnter={(e) => {
        e.target._clearCache();
        props.onHover(props.data.name, e.target.getAbsolutePosition());
        const container = e.target.getStage().container();
        if (isBooked) {
          container.style.cursor = 'not-allowed';
        } else {
          container.style.cursor = 'pointer';
        }
      }}
      onMouseLeave={(e) => {
        props.onHover(null);
        const container = e.target.getStage().container();
        container.style.cursor = '';
      }}
      onClick={(e) => {
        if (isBooked) {
          return;
        }
        if (props.isSelected) {
          props.onDeselect(props.data.name);
        } else {
          props.onSelect(props.data.name);
        }
      }}
      onTap={(e) => {
        if (isBooked) {
          return;
        }
        if (props.isSelected) {
          props.onDeselect(props.data.name);
        } else {
          props.onSelect(props.data.name);
        }
      }}
    />
  );
};

export default Seat;
