import React from 'react';
import * as colors from '@styles/colors';
import styled from 'styled-components';

export const ButtonWrapper = styled('button')`
  background-color: ${colors.primary40};
  color: white;
  width: 100px;
  height: 64px;
  font-size: 20px;
  border-radius: 5px;
  margin: 3px;
  opacity: 0.7;
`;

const DisabledButton = ({ name = '' }) => {
  return <ButtonWrapper>{name}</ButtonWrapper>;
};

export default DisabledButton;
