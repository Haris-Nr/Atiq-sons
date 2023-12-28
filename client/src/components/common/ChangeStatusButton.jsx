import React from "react";
import { Button, Popconfirm } from "antd";
import PropTypes from "prop-types";

const ChangeStatusButton = ({
  Id,
  currentStatus,
  onChangeStatus,
  itemType,
}) => {
  const handleStatusChange = () => {
    let newStatus;

    if (itemType === "product") {
      newStatus =
        currentStatus === "pending"
          ? "approved"
          : currentStatus === "approved"
          ? "rejected"
          : "approved";
    } else if (itemType === "employee") {
      newStatus = currentStatus === "active" ? "blocked" : "active";
    }

    onChangeStatus(Id, newStatus);
  };

  const popconfirmTitle =
    itemType === "product"
      ? `Are you sure to ${
          currentStatus === "approved" ? "reject" : "approve"
        } this product?`
      : itemType === "employee"
      ? `Are you sure to ${
          currentStatus === "active" ? "block" : "activate"
        } this employee?`
      : "";

  const okText =
    itemType === "product"
      ? currentStatus === "approved"
        ? "Reject"
        : "Approve"
      : itemType === "employee"
      ? currentStatus === "active"
        ? "Block"
        : "Activate"
      : "";

  return (
    <Popconfirm
      title={popconfirmTitle}
      onConfirm={handleStatusChange}
      okText={okText}
      cancelText="Cancel"
    >
      <Button type="primary">
        {itemType === "product" && currentStatus === "pending"
          ? "Approve"
          : itemType === "product" && currentStatus === "approved"
          ? "Reject"
          : itemType === "product" && currentStatus === "rejected"
          ? "Approve"
          : itemType === "employee" && currentStatus === "active"
          ? "Block"
          : itemType === "employee" && currentStatus === "blocked"
          ? "Activate"
          : ""}
      </Button>
    </Popconfirm>
  );
};

ChangeStatusButton.propTypes = {
  Id: PropTypes.string.isRequired,
  currentStatus: PropTypes.oneOf([
    "active",
    "blocked",
    "pending",
    "approved",
    "rejected",
  ]).isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  itemType: PropTypes.oneOf(["product", "employee"]).isRequired,
};

export default ChangeStatusButton;
