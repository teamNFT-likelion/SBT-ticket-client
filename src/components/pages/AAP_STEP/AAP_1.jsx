import {PageTitle,SubTitle,TabButton,} from '@components/atoms/AAP_styles';
import styled from 'styled-components';
import { Column, Row } from '@components/atoms/wrapper.style';
import { getCookie } from '@utils/cookie';


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

const dataId = getCookie('dataId');
console.log(dataId);



export const AAP_1 = ({tab,setTab}) => {
    return(<>
      <PageTitle>티켓 결제</PageTitle>
      <SubTitle>| 좌석 선택 |</SubTitle>
      <Row marginTop="24px" marginBottom="24px">
        <SeatsSelectBox>좌석선택</SeatsSelectBox>
        <SeatsInfoBox>좌석정보</SeatsInfoBox>
      </Row>
      <Row>
        <TabButton
          value="aap_0"
          onClick={(newTab) => {
            setTab(newTab.target.value);
            console.log(tab);
          }}
        >
          뒤로가기
        </TabButton>
        <TabButton
          value="aap_2"
          onClick={(newTab) => {
            setTab(newTab.target.value);
            console.log(tab);
          }}
        >
          다음단계
        </TabButton>
      </Row>
    </>);
};
