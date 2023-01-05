import { useState, useEffect, useMemo } from 'react';
import { parseItemType } from '@utils/parser';
import useSbtPreTicketHost from '@hooks/useSbtPreTicketHost';
import PreTicketingPeriod from '@utils/PreTicketingPeriod';
import { useCallback } from 'react';
import { mainItems, restItems } from '@mock/items.js';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function useItems() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramType = searchParams.get('type');
  const [type, setType] = useState('concert');
  const sbtHostList = useSbtPreTicketHost();
  const items = useMemo(() => [...mainItems, ...restItems], []);
  const [typeItems, setTypeItems] = useState(items);

  const [preList, setPreList] = useState([]);

  useEffect(() => {
    //TODO: 페이지타입별로 데이터 바꿔 줘야됨 setData 바꿔줘야댐
    if (paramType === null) {
      setType('concert');
    } else if (paramType === 'exhibit' || paramType === 'sports') {
      setType(paramType);
    } else {
      navigate('/list');
    }
  }, [paramType, navigate]);

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

        if (
          preList
            .map((i) => {
              return i.id;
            })
            .includes(prev.id)
        ) {
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

  return { typeItems, preList, type, items };
}
