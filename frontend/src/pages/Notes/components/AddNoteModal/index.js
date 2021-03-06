import React from "react";
import { Button, Modal, Input, notification, Icon } from "antd";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import FormItem from "antd/lib/form/FormItem";

const CREATE_NOTE_MUTATION = gql`
  mutation($text: String!) {
    createNote(text: $text) {
      text
    }
  }
`;



const AddNoteModal = ({ refetch }) => {
  const [visible, setVisibility] = React.useState(false);
  const [text, setText] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [addNote, { data }] = useMutation(CREATE_NOTE_MUTATION);

  const showModal = () => setVisibility(true);
  const hideModal = () => setVisibility(false);

  const handleAdd = async () => {
    if (!text) return;
    setLoading(true);
    const res = await addNote({
      variables: {
        text
      }
    }).then(() => {
      refetch();
      hideModal();
      setLoading(false);
      openNotification();
    });
    setLoading(false);
  };

  const handleCancel = () => {
    hideModal();
  };

  const openNotification = () => {
    notification.open({
      message: "Note/Task Added",
      icon: <Icon type="smile" style={{ color: "#108ee9" }} />
    });
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
        <FormItem label="Task/Note" validateStatus={!text ? 'error' : ''}>
          <Input
            name="note"
            placeholder="Do the dishes"
            allowClear
            onChange={e => setText(e.target.value)}
          ></Input>
        </FormItem>
      </Modal>
    </div>
  );
};

export default AddNoteModal;
