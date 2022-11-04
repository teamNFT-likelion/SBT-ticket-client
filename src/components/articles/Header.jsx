import React from 'react';
import LinkButton from '@atoms/LinkButton';

const Header = () => {
  return (
    //TODO: 인라인css 리팩토링필요
    <div style={{ width: '100%', height: '64px', border: '2px solid white' }}>
      헤더
      <LinkButton to="/" name="로고" />
      <LinkButton to="/search" name="서치버튼" />
      <LinkButton to="/account" name="프로필버튼" />
    </div>
  );
};

export default Header;
