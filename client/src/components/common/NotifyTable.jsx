import { Button, Table, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchNotifications,
  deleteAllNotify,
  deleteNotify,
  resetdeleteNotificationStatusState,
  seenNotify,
} from "../../redux/Features/Notification/notificationSlice";
import DeleteButton from "./DeleteButton";
import { Link } from "react-router-dom";

const NotifyTable = () => {
  const dispatch = useDispatch();
  const { getNotificationdata, deleteNotificationStatus } = useSelector(
    (state) => state.notifications
  );

  const handleDelete = (id) => {
    dispatch(deleteNotify(id)).then(() => {
      dispatch(FetchNotifications());
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
      dispatch(FetchNotifications())
    });
  };

  const columns = [
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
      dispatch(FetchNotifications())
    })
  }
  
  const heading = (
    <div>
      <Button onClick={deleteALl}>
        Delete All
      </Button>
    </div>
  );

  return (
    <div>
      {" "}
      <Table
       title={() => heading}
        columns={columns}
        dataSource={getNotificationdata.data}
        pagination={false}
        scroll={{
          x: 1100,
        }}
      />
    </div>
  );
};

export default NotifyTable;
