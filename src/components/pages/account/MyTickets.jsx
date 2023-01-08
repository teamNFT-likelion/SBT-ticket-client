import React, { useState, useEffect } from 'react';
import MyTicket from './MyTicket';

const MyTickets = ({ tickets, type }) => {
  const [typeTickets, setTypeTickets] = useState([]);

  useEffect(() => {
    let filteredList;
    if (type === 'active') {
      filteredList = tickets.filter((ticket) => ticket.tokenStatus === 0);
      setTypeTickets(filteredList);
    } else if (type === 'inactive') {
      filteredList = tickets.filter((ticket) => ticket.tokenStatus === 1);
      setTypeTickets(filteredList);
    } else if (type === 'done') {
      filteredList = tickets.filter((ticket) => ticket.tokenStatus === 2);
      setTypeTickets(filteredList);
    } else {
      setTypeTickets(tickets);
    }
  }, [tickets, type]);

  return (
    <>
      {typeTickets.map((token, index) => (
        <MyTicket
          key={token.tokenId}
          id={token.tokenId}
          uri={token.tokenURI}
          hostAddr={token.tokenHostAddr}
          date={token.tokenDL}
          price={token.tokenPrice}
          seats={token.tokenSeats}
          image={token.tokenImage}
          title={token.tokenTitle}
          tEmail={token.tokenUserEmail}
          status={token.tokenStatus}
        />
      ))}
    </>
  );
};

export default MyTickets;
