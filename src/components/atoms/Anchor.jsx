import React, { forwardRef } from 'react';

const Anchor = forwardRef((props, ref) => {
  //TODO: 인라인css 리팩토링필요
  return <div ref={ref} style={{ position: 'absolute', top: '-7.5rem' }}></div>;
});

export default Anchor;
