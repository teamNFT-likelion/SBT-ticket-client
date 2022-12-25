import React from 'react';
import { FiX } from 'react-icons/fi';
import * as colors from '@styles/colors';

const UnCheckedText = ({ text, size = '32px', marginLeft = '12px' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <FiX size="32px" color={colors.bgRed} />
      <span style={{ fontSize: size, marginLeft: marginLeft }}>{text}</span>
    </div>
  );
};

export default UnCheckedText;
