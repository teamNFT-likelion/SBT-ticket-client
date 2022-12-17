import LinkButton from '@atoms/LinkButton';
import { PageTitle, SubTitle } from '@styles/ApaymentStyles';
import { StepBox, LeftBox, RightBox } from './App1Start';

export const App4Done = ({ data }) => {
  //TODO: 공연data + 선택값들 recoil selector로 받아와서 보여주는 화면 기획필요
  return (
    <StepBox>
      <LeftBox>
        <PageTitle>결제가 완료되었습니다.</PageTitle>
        <SubTitle>| 결제 정보 |</SubTitle>
      </LeftBox>
      <RightBox>
        ...???
        <LinkButton to="/account" name="티켓 확인하러가기" />
      </RightBox>
    </StepBox>
  );
};
