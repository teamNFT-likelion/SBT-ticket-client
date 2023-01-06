import React, { useState } from 'react';
import styled from 'styled-components';
import { Column } from '@components/atoms/wrapper.style';
import * as colors from '@styles/colors';
import { lg, sm } from '@styles/GlobalStyle';
import { AiOutlineCaretUp } from 'react-icons/ai';

const CardContainer = styled(Column)`
  border: 3px solid ${(props) => (props.isOpened ? colors.primary40 : colors.bgFAQ)};
  border-radius: 1.4rem;
  white-space: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;

  &:hover {
    background-color: ${(props) => !props.isOpened && colors.bgFAQ};
  }

  ${lg`
    margin: 1.4rem 4rem;
    border-radius: 1.4rem;
  `}

  ${sm`
    margin: 1.3rem 3rem;
    border-radius: 1.2rem;
  `}
`;

const TitleContainer = styled(Column)`
  line-height: 150%;
  width: 100%;
  height: 100%;
  text-align: left;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 1.3rem 1.5rem;
  font-size: 1.9rem;
  margin-top: 0px;
  flex-direction: row;

  ${lg`
    font-size: 1.9rem;
  `}

  ${sm`
    font-size: 1.7rem;
  `}
`;

const ToggleButton = styled(AiOutlineCaretUp)`
  transition: 0.3s;
  transform: ${(props) => (!props.isOpened ? 'rotate(90deg)' : 'rotate(180deg)')};
  color: ${colors.primary80};
  margin: 4px;
`;

const CardByToggle = ({ title, children }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <CardContainer isOpened={isOpened}>
      <TitleContainer onClick={() => setIsOpened((prev) => !prev)}>
        {title}
        <ToggleButton isOpened={isOpened} />
      </TitleContainer>
      {isOpened && children}
    </CardContainer>
  );
};

export default CardByToggle;
