import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { Typography, Button, Icon } from "antd";

const { Title } = Typography;

const ME = gql`
  query me {
    me {
      id
      email
      notes {
        text
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const NotePadContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;
  max-width:400px;
  min-width:400px;
  margin:auto;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Notes = () => {
  const { loading, error, data } = useQuery(ME);

  const user = data ? data.me : null;
  const notes = user ? user.notes : [];
  return (
    <Container>
      <NotePadContainer>
        <Title underline>Notes</Title>
        {notes.map(note => (
          <p>{note.text}</p>
        ))}
        <ActionWrapper>
          <Button type="primary" icon="plus">
            Add
          </Button>
        </ActionWrapper>
      </NotePadContainer>
    </Container>
  );
};

export default Notes;
