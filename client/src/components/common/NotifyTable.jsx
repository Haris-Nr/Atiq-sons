import { Button, Table, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllNotify,
  deleteNotify,
  resetdeleteNotificationStatusState,
  seenNotify,
} from "../../redux/Features/Notification/notificationSlice";
import DeleteButton from "./DeleteButton";
import { Link } from "react-router-dom";
import socket from "../../redux/api/socket";

const NotifyTable = () => {
  const dispatch = useDispatch();
  const { deleteNotificationStatus,notify } = useSelector(
    (state) => state.notifications
  );

  const { user } = useSelector((state) => state.fetch);

  let userId = user?.employee?._id

  const handleDelete = (id) => {
    dispatch(deleteNotify(id)).then(() => {
      socket.emit('fetchNotifications', userId);
    });
  };
  useEffect(() => {
    if (deleteNotificationStatus?.success === true) {
      message.success(deleteNotificationStatus?.message);
      dispatch(resetdeleteNotificationStatusState());
    } else if (deleteNotificationStatus?.success === false) {
      message.error(deleteNotificationStatus?.message);
      dispatch(resetdeleteNotificationStatusState());
    }
  }, [deleteNotificationStatus, dispatch]);

  const handlSeen = (id) => {
    dispatch(seenNotify(id)).then(()=>{
      socket.emit('fetchNotifications', userId);
    });
  };

  const columns = [
    {
      title: "SrNo",
      key: "srNo",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record) => {
        return (
          <Link
            to={`${record.onClick}`}
            onClick={() => {
              handlSeen(record._id);
            }}
          >
            {record.title}
          </Link>
        );
      },
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "user",
      dataIndex: "user",
    },
    {
      title: "whichUser",
      dataIndex: "whichUser",
    },
    {
      title: "Seen",
      dataIndex: "seen",
      render: (text, record) => {
        return <span>{record.seen && "seen"}</span>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <DeleteButton onConfirmDelete={() => handleDelete(record._id)} />
        );
      },
      key: "action",
    },
  ];

  const deleteALl = () =>{
    dispatch(deleteAllNotify()).then(()=>{
      socket.emit('fetchNotifications', userId);
    })
  }
  
  const heading = (
    <div>
      <Button onClick={deleteALl}>
        Delete All
      </Button>
    </div>
  );

  const dataSourceWithKeys = notify
  ? notify
      .map((item,index) => ({
        ...item,
        key: index++,
      }))
  : [];

  return (
    <div>
      {" "}
      <Table
       title={() => heading}
        columns={columns}
        dataSource={dataSourceWithKeys}
        pagination={true}
        scroll={{
          x: 1100,
        }}
      />
    </div>
  );
};

export default NotifyTable;
