import React from "react";
import { Button, Popconfirm } from "antd";
import PropTypes from "prop-types";

const DeleteButton = ({ onConfirmDelete }) => {
  return (
    <Popconfirm
      title="Are you sure to delete this?"
      onConfirm={onConfirmDelete}
      okText="Yes"
      cancelText="No"
    >
      <Button type="danger">Delete</Button>
    </Popconfirm>
  );
};
DeleteButton.propTypes = {
  onConfirmDelete: PropTypes.func.isRequired,
};
export default DeleteButton;
