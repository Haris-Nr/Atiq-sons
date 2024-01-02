import React from "react";
import { Button, Popconfirm } from "antd";
import PropTypes from "prop-types";

const ChangeTrackStatusButton = ({ 
  Id,
  currentStatus,
  onChangeStatus,
  itemType
}) => {
  const handleTrack = () => {
    let newStatus;

    if (itemType === "product") {
      newStatus =
        currentStatus === "pending"
          ? "tracking"
          : currentStatus === "tracking"
            ? "tracked"
            : "tracking";
    }
    onChangeStatus(Id, newStatus);
  };

  const popconfirmTitle = `Are you sure to ${currentStatus === "tracking" ? "tracked" : "start track"
} this product?`;

  const okText =
    itemType === "product"
      ? currentStatus === "tracking"
        ? "Untracked"
        : "Track"
      : "";

  const buttonText =
    itemType === "product"
      ? currentStatus === "pending"
        ? "Start Tracking"
        : currentStatus === "tracking"
          ? "Stop Tracking"
          : currentStatus === "tracked"
            ? "Start Tracking"
            : ""
      : "";

  return (
    <Popconfirm
      title={popconfirmTitle}
      onConfirm={handleTrack}
      okText={okText}
      cancelText="Cancel"
    >
      <Button type="primary">{buttonText}</Button>
    </Popconfirm>
  );
};

ChangeTrackStatusButton.propTypes = {
  Id: PropTypes.string.isRequired,
  currentStatus: PropTypes.oneOf(["pending", "tracking", "tracked"]).isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  itemType: PropTypes.oneOf(["product"]).isRequired,
};

export default ChangeTrackStatusButton;
