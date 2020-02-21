import React from "react";
import { Button, Modal, Input, notification, Icon } from "antd";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import FormItem from "antd/lib/form/FormItem";

const EDIT_NOTE = gql`
  mutation($noteId: Float!, $options: NoteInput!) {
    updateNote(noteId: $noteId, options: $options) {
      id
    }
  }
`;

const EditNoteModal = ({ note, refetch }) => {
  const [visible, setVisibility] = React.useState(false);
  const [text, setText] = React.useState(note.text);
  const [loading, setLoading] = React.useState(false);
  const [editNote, { data }] = useMutation(EDIT_NOTE);

  const showModal = () => setVisibility(true);
  const hideModal = () => setVisibility(false);

  const handleAdd = async () => {
    if (!text) return;
    setLoading(true);
    await editNote({
      variables: {
        noteId: note.id,
        options: {
          text
        }
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
      message: "Note/Task Updated",
      icon: <Icon type="smile" style={{ color: "#108ee9" }} />
    });
  };

  return (
    <div>
      <Button shape="circle" icon="edit" onClick={() => showModal()}></Button>
      <Modal
        title="Edit Note/Task"
        visible={visible}
        onOk={handleAdd}
        confirmLoading={loading}
        onCancel={handleCancel}
        okText="Edit"
      >
        <FormItem label="Task/Note" validateStatus={!text ? "error" : ""}>
          <Input
            name="note"
            value={text}
            placeholder="Do the dishes"
            allowClear
            onChange={e => setText(e.target.value)}
          ></Input>
        </FormItem>
      </Modal>
    </div>
  );
};

export default EditNoteModal;
