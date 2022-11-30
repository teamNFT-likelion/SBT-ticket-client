import React, { useState } from 'react';
import Layout from '@articles/Layout';
import LinkButton from '@atoms/LinkButton';
import DetailInfo from '@components/atoms/DetailInfo';
import { Row } from '@components/atoms/wrapper.style';
import { Ticket } from '@components/articles/AAP-inactive';
import { DummyData } from './ticketList/tempData/DummyData';
import {Container,PageTitle,SubTitle,TabButton,TempBox,} from '@components/atoms/AAP_styles';
import { AAP_1 } from './AAP_STEP/AAP_1';
import { AAP_2 } from './AAP_STEP/AAP_2';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


const APaymentPage = () => {
  // tap 키 저장 state
  const [tab, setTab] = useState('aap_0');
    let location = useLocation();

  useEffect(()=>{
    // console.log(location);
  if(location.search){
    setTab("aap_2");
  }
  },[location]);
  

const AAP_0 = (
  <>
    <PageTitle>티켓 결제</PageTitle>
    <SubTitle>| 선택한 공연 정보 |</SubTitle>
    <DetailInfo />
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
  </>
);




const AAP_3 = (
  <>
    <PageTitle>결제가 완료되었습니다.</PageTitle>
    <SubTitle>| 결제 정보 |</SubTitle>
    <TempBox>결제된 티켓의 정보</TempBox>
    <LinkButton to="/account" name="티켓 확인하러가기" />
  </>
);


 

  return (
    <Layout page="a-payment-page">
      <Container>
        {tab === 'aap_0' ? AAP_0 : null}
        {tab === 'aap_1' ? <AAP_1 tab={tab} setTab={setTab} /> : null}
        {tab === 'aap_2' ? <AAP_2 tab={tab} setTab={setTab} /> : null}
        {tab === 'aap_3' ? AAP_3 : null}
      </Container>
    </Layout>
  );
};

export default APaymentPage;
