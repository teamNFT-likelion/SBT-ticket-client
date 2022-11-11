import React, { useState } from 'react';
import styled from 'styled-components';
import { Column} from '@components/atoms/wrapper.style';
import * as colors from '@styles/colors';
import { lg, sm } from '@styles/GlobalStyle';
import { AiOutlineCaretUp } from 'react-icons/ai';


//  [O] 겹치는 것들 atom으로
//  [O] props 없애주기
//  [O] div-span버튼 크게 하나로
//  [O] border에서 A면 어떤거 아니면 기본
//  [O] colors (1)가져다쓰고 (2)많이 쓰는거 등록
//  [O] inline 빼는게 좋다!(for 가독성)
//  [O] react-icons 이용해서 버튼 색 수정
//  [O] 반응형 적용 (Roadmap, FAQ)
//  [ ] Answer 열리는거 transtition 적용해주고싶다

 
const Button = styled(Column)`
width: 100%;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const CardContainer = styled(Column)`
  border: 3px solid
    ${(props) => (props.isOpened ? colors.primary40 : colors.bgFAQ)};
  border-radius: 1.4rem;
  white-space: wrap;
  margin: 1rem;
  padding: 1.3rem;
  align-items: center;
  justify-content: center;
  width: 76vw;

  &:hover {
    background-color: ${(props) => !props.isOpened && colors.bgFAQ};
  }

  ${lg`
    margin: 1.4rem 4rem;
    padding: 1.2rem
    border-radius: 1.4rem;
  `}

  ${sm`
    margin: 1.3rem 3rem;
    padding: 1.3rem;
    border-radius: 1.2rem;
  `}
`;

const TitleContainer = styled(Column)`
  line-height: 150%;
  text-align: left;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0.5rem 1.5rem;
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
  transform: ${(props) =>
    !props.isOpened ? 'rotate(90deg)' : 'rotate(180deg)'};
  color: ${colors.primary80};
  margin: 4px;
`;



const CardByToggle = ({ title, children }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    //TODO: 인라인css 리팩토링필요

    <CardContainer isOpened={isOpened}>
      <Button
        onClick={() => {
          setIsOpened((prev) => !prev);
        }}
      >
      <TitleContainer>
        <span>{title}</span> &nbsp;
        <ToggleButton isOpened={isOpened} />
      </TitleContainer>
      </Button>
      <div>{isOpened && children}</div>
    </CardContainer>
  );
};

export default CardByToggle;
