import React, { useState, useEffect } from 'react';
import { parseItemType } from '@utils/parser';
import { BigPosterWrapper, PosterCard, ImgCard, DescCard } from './BigPoster.style';
import PreTicketingPeriod from '@utils/PreTicketingPeriod';
import { BigPosterButton } from '@components/articles/BigPosterButton';
import { BigPosterInfo } from '@components/articles/BigPosterInfo';
import useSbtPreTicketHost from '@hooks/useSbtPreTicketHost';
import { mainItems } from '@mock/items';

const BigPoster = ({ type, items }) => {
  const [activePosterId, setActivePosterId] = useState(0);
  const [typeItems, setTypeItems] = useState(items);
  const [preList, setPreList] = useState([]);

  const sbtHostList = useSbtPreTicketHost();

  function getMyPreTList() {
    if (localStorage.getItem('_user')) {
      let mySbtPreTList = [];
      sbtHostList.forEach((id) => {
        const pre_ticket_list = mainItems.filter((item) =>
          item.preTicketingList.includes(id.tokenHostAddr),
        );
        [mySbtPreTList] = [...mySbtPreTList, pre_ticket_list !== [] && pre_ticket_list];
      });

      setPreList(mySbtPreTList);
    } else {
      return;
    }
  }

  const onClickCard = (side) => {
    if (activePosterId === 0 && side === 'right') {
      setActivePosterId(2);
    } else if (activePosterId === 0 && side === 'left') {
      setActivePosterId(1);
    } else {
      setActivePosterId(0);
    }
  };

  useEffect(() => {
    getMyPreTList();
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
    setActivePosterId(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, items]);

  return (
    <BigPosterWrapper>
      <PosterCard isOpen={activePosterId !== 2} flexDirection="row-reverse">
        <ImgCard src={typeItems[0].posterImgUrl} alt="aa" onClick={() => onClickCard('left')} />
        <DescCard isOpen={activePosterId === 1}>
          <div className="card-box">
            <BigPosterInfo Item={typeItems[0]} />
            <BigPosterButton Item={typeItems[0]} />
          </div>
        </DescCard>
      </PosterCard>
      <PosterCard isOpen={activePosterId !== 1}>
        <ImgCard src={typeItems[1].posterImgUrl} alt="aa" onClick={() => onClickCard('right')} />
        <DescCard isOpen={activePosterId === 2}>
          <div className="card-box">
            <BigPosterInfo Item={typeItems[1]} />
            <BigPosterButton Item={typeItems[1]} />
          </div>
        </DescCard>
      </PosterCard>
    </BigPosterWrapper>
  );
};

export default BigPoster;
