import React, { useState } from 'react';
import Layout from '@articles/Layout';
import LinkButton from '@atoms/LinkButton';
import DetailInfo from '@components/atoms/DetailInfo';
import { Row } from '@components/atoms/wrapper.style';
import { Ticket } from '@components/articles/AAP-inactive';
import {Container,PageTitle,SubTitle,TabButton,TempBox,} from '@components/atoms/AAP_styles';
import { AAP_1 } from './AAP_STEP/AAP_1';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { DummyData } from './tempData/DummyData';
import { mainItems } from 'src/mock/items';
import { parse } from 'query-string';


const AAP_0 = ({tab, setTab, dataId}) => {

  const data = mainItems.filter((item) => item.id === dataId)[0];
  console.log(data);
  console.log("aap-0-tab", tab);


  return(<>
    <PageTitle>티켓 결제</PageTitle>
    <SubTitle>| 선택한 공연 정보 |</SubTitle>
    <DetailInfo dataId={dataId} />
    <SubTitle>| YOUR INACTIVE TICKETS |</SubTitle>
    <Row>
      {DummyData.map((ticket) => (
        <Ticket
          id={ticket.id}
          image={ticket.image}
          title={ticket.title}
          date={ticket.date}
          active={ticket.active}
          key={ticket.id}
        />
      ))}
    </Row>

    <TabButton
      value="aap_1"
      onClick={(newTab) => {
        setTab(newTab.target.value);
      }}
    >
      예매하기
    </TabButton>
  </>);
};

  const AAP_3 = (dataId) => {
    return (
      <>
        <PageTitle>결제가 완료되었습니다.</PageTitle>
        <SubTitle>| 결제 정보 |</SubTitle>
        <TempBox>결제된 티켓의 정보</TempBox>
        <LinkButton to="/account" name="티켓 확인하러가기" />
      </>
    );
  };
const APaymentPage = () => {
  // tap 키 저장 state
  const [tab, setTab] = useState('aap_0');
  const navigate = useNavigate();
  let location = useLocation();

  const parsed = parse(location.search);

  const dataId = parsed.id;
  console.log(location);



  useEffect(() => {
    if (location.state?.tab==='aap_3') {
      setTab('aap_3');
    }
  }, [location]);



  return (
    <Layout page="a-payment-page">
      <Container>
        {tab === 'aap_0' ? <AAP_0 tab={tab} setTab={setTab} dataId={dataId} /> : null}
        {tab === 'aap_1' ? (
          <AAP_1 tab={tab} setTab={setTab} dataId={dataId} />
        ) : null}
        {tab === 'app_2' ? navigate({pathname:'/payment', state:{dataId:dataId, setTab:setTab, tab:tab}}):null}
        {tab === 'aap_3' ? <AAP_3 dataId={dataId} /> : null}
      </Container>
    </Layout>
  );
};

export default APaymentPage;
