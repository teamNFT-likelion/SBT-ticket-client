import React from 'react';
import Layout from '@articles/Layout';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { Link } from 'react-router-dom';

const Container = styled('div')`
  display: flex;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 150px;
  align-items: center;
  flex-direction: column;
`;

const TitleContainer = styled('div')`
  margin: 50px 0;
`;

const TitleWrapper = styled('div')`
  margin-top: 40px;
  font-size: 40px;
`;

const QueryEmphasize = styled('span')`
  font-size: 30px;
  font-weight: 400;
  color: ${colors.bgRed};
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

const Page404 = () => {
  return (
    <Layout>
      <Container>
        <TitleContainer>
          <TitleWrapper>
            <QueryEmphasize> [ 404 ] The path does not exist.</QueryEmphasize>
          </TitleWrapper>
        </TitleContainer>
        <Link to="/list" name="return to list">
          <ButtonWrapper>return to list</ButtonWrapper>
        </Link>
      </Container>
    </Layout>
  );
};

export default Page404;
