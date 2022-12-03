import { PageTitle, SubTitle, TabButton } from '@styles/ApaymentStyles';
import styled from 'styled-components';
import { Column, Row } from '@components/atoms/wrapper.style';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '@utils/cookie';

const SeatsSelectBox = styled(Column)`
  height: 570px;
  width: 600px;
  border: white 4px solid;
`;

const SeatsInfoBox = styled(Column)`
  height: 570px;
  width: 200px;
  border: white 4px solid;
`;

export const App2SelectSeats = ({ setTab, dataId }) => {
  const navigate = useNavigate();

  return (
    <>
      <PageTitle>티켓 결제</PageTitle>
      <SubTitle>| 좌석 선택 |</SubTitle>
      <Row marginTop="24px" marginBottom="24px">
        <SeatsSelectBox>좌석선택</SeatsSelectBox>
        <SeatsInfoBox>좌석정보</SeatsInfoBox>
      </Row>
      <Row>
        <TabButton
          value="APP_Start"
          onClick={(newTab) => {
            setTab(newTab.target.value);
          }}
        >
          뒤로가기
        </TabButton>
        <TabButton
          value="APP_GetInfo"
          onClick={(newTab) => {
            setTab(newTab.target.value);
            setCookie('dataId', dataId);
            navigate('/getInfo');
          }}
        >
          다음단계
        </TabButton>
      </Row>
    </>
  );
};
