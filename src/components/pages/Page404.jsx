import React from 'react';
import Layout from '@articles/Layout';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { Link } from 'react-router-dom';
import ErrorImage from '@assets/img/ErrorImage.svg';

const Container = styled('div')`
  display: flex;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 150px;
  align-items: center;
  flex-direction: column;
`;

const ButtonWrapper = styled('button')`
  color: ${colors.bgRed};
  width: 150px;
  height: 40px;
  font-size: 15px;
  cursor: pointer;
  border: 4px solid ${colors.bgRed};
  margin: 3px;
`;

const ErrorIll = styled('img')`
  width: 100%;
  height: 100%;
`;

const Page404 = () => {
  return (
    <Layout>
      <Container>
        <ErrorIll src={ErrorImage} />
        <Link to="/list" name="return to list">
          <ButtonWrapper>return to list</ButtonWrapper>
        </Link>
      </Container>
    </Layout>
  );
};

export default Page404;
