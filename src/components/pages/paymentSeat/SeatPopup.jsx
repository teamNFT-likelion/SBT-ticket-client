import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled('div')`
  position: absolute;
  top: ${(props) => `${props.position.y + 20}px`};
  left: ${(props) => `${props.position.x + 20}px`};
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px grey;
  z-index: 10;
  background-color: white;
  color: black;
`;

const isClickedInside = (e, element) => {
  let node = e.target;
  while (node) {
    if (node === element) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

const Popup = ({ position, seatId, onClose }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (!isClickedInside(e, containerRef.current)) {
        onClose();
      }
    };
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('click', onClick);
    };
  }, []);
  
  return (
    <Container ref={containerRef} position={position}>
      <div>Seat: {seatId}</div>
      <div>Click on the seat to select</div>
    </Container>
  );
};

export default Popup;
