import React from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { Typography, Button, List, Spin, notification, Icon } from "antd";
import AddNoteModal from "./components/AddNoteModal";
import EditNoteModal from "./components/EditNoteModal";

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
  mutation removeNote($noteId: Float!) {
    deleteNote(noteId: $noteId)
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #fa5f91;
`;

const NotePadContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;
  max-width: 400px;
  /* min-width: 400px; */
  margin: auto;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  background: white;
  border-radius: 5px;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
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

  const openNotification = () => {
    notification.open({
      message: "Note/Task Removed",
      icon: <Icon type="smile" style={{ color: "#108ee9" }} />
    });
  };

  return (
    <Container>
      <NotePadContainer>
        {!loading && <Title underline>Notes</Title>}
        {loading ? (
          <Spin />
        ) : (
          <List
            bordered
            dataSource={notes}
            renderItem={note => (
              <ListItem
                actions={[
                  <EditNoteModal refetch={refetch} note={note} />,
                  <Button
                    shape="circle"
                    icon="delete"
                    type="danger"
                    onClick={async () => {
                      await removeNote({
                        variables: { noteId: note.id }
                      }).then(() => {
                        openNotification();
                        refetch();
                      });
                    }}
                  />
                ]}
              >
                {note.text}
              </ListItem>
            )}
          ></List>
        )}
        {!loading && (
          <>
            <br />
            <ActionWrapper>
              <AddNoteModal refetch={refetch} />
            </ActionWrapper>
          </>
        )}
      </NotePadContainer>
    </Container>
  );
};

export default Notes;
