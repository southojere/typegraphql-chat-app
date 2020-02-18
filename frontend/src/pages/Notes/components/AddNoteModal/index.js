import React from "react";
import { Button, Modal, Input } from "antd";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const CREATE_NOTE_MUTATION = gql`
  mutation($text: String!) {
    createNote(text: $text) {
      text
    }
  }
`;

const AddNoteModal = ({refetch}) => {
  const [visible, setVisibility] = React.useState(false);
  const [text, setText] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [addNote, { data }] = useMutation(CREATE_NOTE_MUTATION);

  const showModal = () => setVisibility(true);
  const hideModal = () => setVisibility(false);

  const handleAdd = async () => {
    setLoading(true);
    const res = await addNote({
      variables: {
        text
      }
    }).then(() => {
      refetch();
      hideModal();
      setLoading(false);
    });
    setLoading(false);
  };

  const handleCancel = () => {
    hideModal();
  };

  return (
    <div>
      <Button type="primary" icon="plus" onClick={() => showModal()}>
        Add
      </Button>
      <Modal
        title="Create new note"
        visible={visible}
        onOk={handleAdd}
        confirmLoading={loading}
        onCancel={handleCancel}
        okText="Add"
      >
        <label name="note">Name:</label>
        <Input
          name="note"
          placeholder="Do the dishes"
          onChange={e => setText(e.target.value)}
        ></Input>
      </Modal>
    </div>
  );
};

export default AddNoteModal;
