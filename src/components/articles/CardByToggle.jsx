import React, { useState } from 'react';
import styled from 'styled-components';

//  [ ] 겹치는 것들 atom으로
//  [ ] props 없애주기
//  [ ] div-span버튼 크게 하나로
//  [ ] border에서 A면 어떤거 아니면 기본
//  [ ] colors (1)가져다쓰고 (2)많이 쓰는거 등록
//  [ ] inline 빼는게 좋다!(for 가독성)
//  [ ] react-icons 이용해서 버튼 색 수정


 
const Container = styled('div')`
  border: 3px solid ${(props) => (props.isOpened ? '#7E9E10' : '#dfffb411')};
  border-radius: 30px;
  margin: 20px 150px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: auto;
  transition: background 0.1s ease-in-out;

  &:hover {
    background-color: ${(props) => !props.isOpened && '#dfffb411'};
  }
`;

const TextContainer = styled('div')`
  padding-top: 30px;
  line-height: 150%;
  font-size: 20.3px;
  padding-left: 10px;
`;


const CardByToggle = ({ title, children}) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    //TODO: 인라인css 리팩토링필요
    <Container isOpened={isOpened}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '30px' }}>{title}</span>
        <button
          onClick={() => {setIsOpened((prev) => !prev);}} >
          {isOpened ? '🔺' : '🔻'}
        </button>
      </div>
      {isOpened && <TextContainer>{children}</TextContainer>}
    </Container>
  );
};

export default CardByToggle;
