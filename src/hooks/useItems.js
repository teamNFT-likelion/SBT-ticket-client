import { useState, useEffect } from 'react';
import { parseItemType } from '@utils/parser';
import useSbtPreTicketHost from '@hooks/useSbtPreTicketHost';
import PreTicketingPeriod from '@utils/PreTicketingPeriod';
import { useCallback } from 'react';

export default function useItems({ type, items }) {
  const [typeItems, setTypeItems] = useState(items);
  const sbtHostList = useSbtPreTicketHost();

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

  return typeItems;
}
