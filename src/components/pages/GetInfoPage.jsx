import React from 'react';
import useOauth from '@hooks/useOauth';

const GetInfoPage = () => {
  useOauth();
  return (
    <div style={{ backgroundColor: 'white', width: '100%', height: '100vh' }}>
      ...
    </div>
  );
};

export default GetInfoPage;
