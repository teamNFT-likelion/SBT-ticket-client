import React from 'react';
import { FiCheck } from 'react-icons/fi';
import * as colors from '@styles/colors';

const CheckedText = ({ text, size = '32px', marginLeft = '12px' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <FiCheck size="32px" color={colors.primary80} />
      <span style={{ fontSize: size, marginLeft: marginLeft }}>{text}</span>
    </div>
  );
};

export default CheckedText;
