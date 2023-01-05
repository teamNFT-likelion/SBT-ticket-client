import React from 'react';
import styled from 'styled-components';
import Problem from './Problem';
import { APP_MAX_W, APP_HEADER_H } from '@constants/styleConst';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${APP_MAX_W}px;
  position: relative;
  overflow: hidden;
  padding: 0 2.75rem;
  margin-top: ${APP_HEADER_H};
`;

const SolvingAndProblem = () => {
  return (
    <Container>
      <Problem />
    </Container>
  );
};

export default SolvingAndProblem;
