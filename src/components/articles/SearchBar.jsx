import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import * as colors from '@styles/colors';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SearchBarContainer = styled('div')`
  display: flex;
  width: 620px;
  height: 50px;
  align-items: center;
`;

const SearchTerm = styled('input')`
  width: 100%;
  border: 3px solid ${colors.primary40};
  background-color: ${colors.bgBlack};
  border-right: none;
  padding: 5px;
  height: 50px;
  border-radius: 5px 0 0 5px;
  outline: none;
  font-size: 20px;
  color: ${colors.textWhite};
`;

const SearchButton = styled('button')`
  width: 56px;
  height: 50px;
  border: 1px solid ${colors.primary40};
  background: ${colors.primary40};
  text-align: center;
  color: white;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
`;

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  return (
    <SearchBarContainer>
      <SearchTerm
        type="text"
        placeholder="Which ticket are you looking for?"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyUp={() => {
          // 엔터키를 눌렀을 때
          if (window.event.keyCode === 13) {
            navigate({ pathname: '/search', search: `?typing=${query}` });
          }
        }}
      />
      <SearchButton
        type="submit"
        onClick={() => {
          navigate({ pathname: '/search', search: `?typing=${query}` });
        }}
        value={query}
      >
        <AiOutlineSearch size={36} color="black" />
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
