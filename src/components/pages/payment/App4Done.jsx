import LinkButton from '@atoms/LinkButton';
import { PageTitle, SubTitle, TempBox } from '@styles/ApaymentStyles';

export const App4Done = () => {
  return (
    <>
      <PageTitle>결제가 완료되었습니다.</PageTitle>
      <SubTitle>| 결제 정보 |</SubTitle>
      <TempBox>결제된 티켓의 정보</TempBox>
      <LinkButton to="/account" name="티켓 확인하러가기" />
    </>
  );
};
