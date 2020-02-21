import React from "react";
import Login from "../../components/Login";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;

  > div {
    width: 50%;
    height: 100vh;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    > div {
      width: 100% !important;
      height: unset;
    }
    > div:first-child {
        margin-bottom:3rem;
    }
  }
`;

const LeftHalf = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem;
  background: rgb(250, 96, 145);
  background: linear-gradient(
    149deg,
    rgba(250, 96, 145, 1) 0%,
    rgba(250, 96, 145, 1) 35%,
    rgba(66, 50, 137, 1) 100%
  );

  h1 {
    font-size: 48px;
    font-weight: normal;
    color: white;
  }

  p {
    font-size: 24px;
    font-weight: 100;
    color: white;
  }
`;

const RightHalf = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoginPage = () => {
  return (
    <Container>
      <LeftHalf>
        <h1>Simple Notes</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </LeftHalf>

      <RightHalf>
        <Login />
      </RightHalf>
    </Container>
  );
};

export default LoginPage;
