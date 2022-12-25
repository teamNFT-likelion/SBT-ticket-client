import React from 'react';
import LoadingSpinner from '@atoms/LoadingSpinner';

const LoadingText = ({ text, size = '32px', marginLeft = '12px' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <LoadingSpinner width={size} height={size} />
      <span style={{ fontSize: size, marginLeft: marginLeft }}>{text}</span>
    </div>
  );
};

export default LoadingText;
