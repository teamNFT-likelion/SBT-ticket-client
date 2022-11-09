import React, { useState } from 'react';
import styled from 'styled-components';
import { Column } from '@components/atoms/wrapper.style';
import * as colors from '@styles/colors';
import { lg, sm } from '@styles/GlobalStyle';


//  [ing] 겹치는 것들 atom으로
//  [O] props 없애주기
//  [ ] div-span버튼 크게 하나로
//  [O] border에서 A면 어떤거 아니면 기본
//  [O] colors (1)가져다쓰고 (2)많이 쓰는거 등록
//  [ ] inline 빼는게 좋다!(for 가독성)
//  [ ] react-icons 이용해서 버튼 색 수정
//  [O] 반응형 적용 (Roadmap, FAQ)

 
const Button = styled(Column)`
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const ContentsContainer = styled(Column)`
  border: 3px solid
    ${(props) => (props.isOpened ? colors.primary40 : colors.bgFAQ)};
  border-radius: 30px;
  white-space: wrap;
  margin: 20px;
  padding: 28px;
  width: 80vw;
  height: auto;
  transition: background 0.1s ease-in-out;

  &:hover {
    background-color: ${(props) => !props.isOpened && colors.bgFAQ};
  }

  ${lg`
    gap: 23px;
    margin: 23px 44px;
    padding: 23px;
  `}

  ${sm`
    gap: 19px;
    margin: 19px 33px;
    padding: 19px;
  `}
`;

const TextContainer = styled(Column)`
  line-height: 150%;
  font-size: 20.3px;
  text-align: left;
  align-items: center;
  justify-content: center;
  margin-top: 28px;

  ${lg`
    font-size: 15px;
    margin-top: 23px;
  `}

  ${sm`
    font-size: 12px;
    margin-top: 19px;
  `}
`;

const TitleContainer = styled(TextContainer)`
  font-size: 28px;
  margin-top: 0px;
  ${lg`
    font-size: 23px;
  `}

  ${sm`
    font-size: 19px;
  `}
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
        </TitleContainer>
        {isOpened && <TextContainer>{children}</TextContainer>}
      </ContentsContainer>
    </Button>
  );
};

export default CardByToggle;
