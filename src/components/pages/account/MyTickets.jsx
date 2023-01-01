import React, { useState, useEffect } from 'react';
import MyTicket from './MyTicket';

const MyTickets = ({ tickets, type }) => {
  const [typeTickets, setTypeTickets] = useState([]);

  useEffect(() => {
    let filteredList;
    if (type === 'active') {
      filteredList = tickets.filter((ticket) => ticket.tokenIsActive === true);
      setTypeTickets(filteredList);
    } else if (type === 'inactive') {
      filteredList = tickets.filter((ticket) => ticket.tokenIsActive === false);
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
          date={token.tokenDL}
          price={token.tokenPrice}
          seats={token.tokenSeats}
          image={token.tokenImage}
          title={token.tokenTitle}
          tEmail={token.tokenUserEmail}
          active={token.tokenIsActive}
        />
      ))}
    </>
  );
};

export default MyTickets;
