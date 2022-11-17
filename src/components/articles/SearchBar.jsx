import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = () => {
  return (
    //TODO: 리팩토링필요

    <div
      style={{
        display: 'flex',
        border: '2px solid white',
        width: '620px',
        height: '40px',
        alignItems: 'center',
      }}
    >
      <input
        type="text"
        style={{
          flex: 1,
          height: '100%',
          outline: 'none',
          fontSize: '20px',
        }}
      />
      <AiOutlineSearch size={32} />
    </div>
  );
};

export default SearchBar;
