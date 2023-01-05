import React, { useState, useEffect } from 'react';
import PosterItem from './PosterItem';
import styled from 'styled-components';
import { parseItemType } from '@utils/parser';
import useSbtPreTicketHost from '@hooks/useSbtPreTicketHost';
import PreTicketingPeriod from '@utils/PreTicketingPeriod';
import { useCallback } from 'react';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 25px;
  margin: 10px 0;
`;

const PosterWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 60px;
`;

const PosterItems = ({ type, items }) => {
  const [typeItems, setTypeItems] = useState(items);
  const sbtHostList = useSbtPreTicketHost();

  const getTitle = (_type) => {
    if (_type === 'concert') return '공연';
    if (_type === 'exhibit') return '전시';
    if (_type === 'sports') return '스포츠';
  };

  const [preList, setPreList] = useState([]);

  const getMyPreTList = useCallback(() => {
    let mySbtPreTList = [];

    if (localStorage.getItem('_user')) {
      sbtHostList.forEach((id) => {
        const pre_ticket_list = items.filter((item) =>
          item.preTicketingList.includes(id.tokenHostAddr),
        );
        [mySbtPreTList] = [...mySbtPreTList, pre_ticket_list !== [] && pre_ticket_list];
      });

      setPreList(mySbtPreTList);
    } else {
      return;
    }
  }, [setPreList, items, sbtHostList]);

  useEffect(() => {
    let filteredList = items
      .filter((item) => item.topic === parseItemType(type))
      .map((prev) => {
        let cp = { ...prev, preTState: PreTicketingPeriod(prev.preTicketing) };

        if (preList.map((i) => i.id).includes(prev.id)) {
          cp = { ...cp, prePossible: true };
        } else {
          cp = { ...cp, prePossible: false };
        }
        return cp;
      });
    setTypeItems(filteredList);
  }, [items, type, preList]);
  useEffect(() => {
    getMyPreTList();
  }, [getMyPreTList]);

  return (
    <Container>
      <TitleWrapper>{getTitle(type)}</TitleWrapper>
      <PosterWrapper>
        {typeItems.map((data) => (
          <PosterItem
            key={data.id}
            dataId={data.id}
            posterImgUrl={data.posterImgUrl}
            title={data.title}
            startDate={data.startDate}
            endDate={data.endDate}
            preTicketing={data.preTicketing}
            prePossible={data.prePossible}
          />
        ))}
      </PosterWrapper>
    </Container>
  );
};

export default PosterItems;
