import React from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { Typography, Button, List, Spin } from "antd";
import AddNoteModal from "./components/AddNoteModal";

const { Title } = Typography;

const ME = gql`
  query me {
    me {
      id
      email
      notes {
          id
        text
      }
    }
  }
`;

const REMOVE_NOTE = gql`
  mutation removeNote ($noteId: Float!) {
    deleteNote(noteId:$noteId)
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
  max-width: 400px;
  /* min-width: 400px; */
  margin: auto;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top:1rem;
`;

const ListItem = styled(List.Item)`
  display: flex;
  justify-content: space-between;
`;

const Notes = () => {
  const { loading, error, data, refetch } = useQuery(ME);
  const [removeNote, { data: removeNoteData }] = useMutation(REMOVE_NOTE);

  const user = data ? data.me : null;
  const notes = user ? user.notes : [];
  return (
    <Container>
      <NotePadContainer>
        <Title underline>Notes</Title>
        {loading ? (
          <Spin />
        ) : (
          <List
            bordered
            dataSource={notes}
            renderItem={note => (
              <ListItem
                actions={[
                  <Button shape="circle" icon="edit" />,
                  <Button shape="circle" icon="delete" type="danger"  onClick={async () => {
                    await removeNote({variables: {noteId: note.id}}).then(() => refetch());
                  }}/>
                ]}
              >
                {note.text}
              </ListItem>
            )}
          ></List>
        )}
        <br />
        <ActionWrapper>
        <AddNoteModal refetch={refetch}/>
        </ActionWrapper>
      </NotePadContainer>
    </Container>
  );
};

export default Notes;