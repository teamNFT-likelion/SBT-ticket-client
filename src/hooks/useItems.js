import { useState, useEffect, useMemo, useRef } from 'react';
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

  const preList = useRef([]);
  const copyFilteredList = useRef();

  const getMyPreTList = useCallback(() => {
    if (localStorage.getItem('_user') && sbtHostList && !preList.current.length) {
      sbtHostList.forEach((id) => {
        const pre_ticket_list = items.filter((item) =>
          item.preTicketingList.includes(id.tokenHostAddr),
        );
        preList.current = [...preList.current, ...pre_ticket_list];
      });
    } else {
      return;
    }
  }, [items, sbtHostList]);

  useEffect(() => {
    if (sbtHostList && items) {
      getMyPreTList();
    }
    // eslint-disable-next-line
  }, [sbtHostList, items]);

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

  useEffect(() => {
    let filteredList = items
      .filter((item) => item.topic === parseItemType(type))
      .map((prev) => {
        copyFilteredList.current = { ...prev, preTState: PreTicketingPeriod(prev.preTicketing) };
        if (
          preList.current
            .map((i) => {
              return i.id;
            })
            .includes(prev.id)
        ) {
          copyFilteredList.current = { ...copyFilteredList.current, prePossible: true };
        } else {
          copyFilteredList.current = { ...copyFilteredList.current, prePossible: false };
        }
        return copyFilteredList.current;
      });
    setTypeItems(filteredList);
  }, [items, type, sbtHostList, copyFilteredList]);

  return { typeItems, preList, type, items };
}
