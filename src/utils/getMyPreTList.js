import { mainItems } from '@mock/items';

export default function getMyPreTList({ sbtHostList }) {
  if (localStorage.getItem('_user')) {
    console.log('sbtHostList : ', sbtHostList[0]?.tokenHostAddr);
    let mySbtPreTList = [];
    sbtHostList.forEach((id) => {
      const pre_ticket_list = mainItems.filter((item) =>
        item.preTicketingList.includes(id.tokenHostAddr),
      );
      [mySbtPreTList] = [...mySbtPreTList, pre_ticket_list !== [] && pre_ticket_list];
    });

    console.log(mySbtPreTList);
  } else {
    return;
  }
}
