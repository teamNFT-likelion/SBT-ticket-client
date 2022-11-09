import React, { forwardRef } from 'react';
import styled from 'styled-components';
import Anchor from '@atoms/Anchor';
import Solving from './Solving';
import Problem from './Problem';
import { APP_MAX_W } from '@constants/styleConst';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${APP_MAX_W}px;
  position: relative;
  overflow: hidden;
  padding: 0 2.75rem;
`;

const SolvingAndProblem = forwardRef((props, ref) => {
  return (
    <Container>
      <Anchor ref={ref} />
      <Solving />
      <Problem />
    </Container>
  );
});

export default SolvingAndProblem;
