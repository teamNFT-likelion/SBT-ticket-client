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
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const ContentsContainer = styled(Column)`
  border: 3px solid
    ${(props) => (props.isOpened ? colors.primary40 : colors.bgFAQ)};
  border-radius: 2.6rem;
  white-space: wrap;
  margin: 2rem;
  padding: 28px;
  width: 80vw;

  &:hover {
    background-color: ${(props) => !props.isOpened && colors.bgFAQ};
  }

  ${lg`
    margin: 1.9rem 4rem;
    padding: 1.9rem;
    border-radius: 1.9rem;
  `}

  ${sm`
    margin: 1.7rem 3rem;
    padding: 1.7rem;
    border-radius: 1.7rem;
  `}
`;

const TextContainer = styled(Column)`
  line-height: 150%;
  font-size: 1.7rem;
  text-align: left;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  overflow: hidden;

  ${lg`
    font-size: 1.6rem;
    margin-top: 1.6remrem;
  `}

  ${sm`
    font-size: 1.3rem;
    margin-top: 1.3rem;
  `}
`;

const TitleContainer = styled(TextContainer)`
  font-size: 2rem;
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
    props.isOpened && 'rotate(180deg)'};
  color: ${colors.primary80};
  margin: 4px;
`;



const CardByToggle = ({ title, children}) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    //TODO: 인라인css 리팩토링필요
    <Button
      onClick={() => {
        setIsOpened((prev) => !prev);
      }}
    >
      <ContentsContainer isOpened={isOpened}>
        <TitleContainer>
            <span>{title}</span>
            <ToggleButton isOpened={isOpened} />
        </TitleContainer>
        {isOpened && <TextContainer>{children}</TextContainer>}
      </ContentsContainer>
    </Button>
  );
};

export default CardByToggle;
