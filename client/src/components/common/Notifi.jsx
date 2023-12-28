import React, { useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { Dropdown, Space, Badge, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchNotifications,
  seenNotify,
} from "../../redux/Features/Notification/notificationSlice";
import { Link } from "react-router-dom";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";
const Notifi = () => {
  const dispatch = useDispatch();
  const { getNotificationdata } = useSelector((state) => state.notifications);
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    dispatch(FetchNotifications());
  }, [dispatch]);

  const handleSeenNotify = (id) => {
    dispatch(seenNotify(id)).then(() => {
      dispatch(FetchNotifications());
    });
  };

  useEffect(() => {
    if (Array.isArray(getNotificationdata?.data)) {
      const latestNotifications = getNotificationdata?.data.slice(0, 3);
      setVisibleNotifications(latestNotifications);
    }
  }, [getNotificationdata]);

  const notificationItems = visibleNotifications.map((notification) => [
    {
      label: (
        <Link
          to={`notification/${notification.onClick}`}
          onClick={() => {
            handleSeenNotify(notification._id);
          }}
        >
          <div className="flex justify-start space-x-5 items-center">
            {notification.image ? (
              <Avatar src={<img src={notification.image} alt="avatar" />} />
            ) : (
              <Avatar icon={<UserOutlined />} />
            )}
            {notification.title}
            <span>
              {notification.message}
              <br />
              {moment(notification.createdAt).fromNow()}
            </span>
            <Badge status="default" />
          </div>
        </Link>
      ),
      key: notification._id,
    },
    {
      type: "divider",
    },
  ]);

  const flattenedNotificationItems = [].concat(...notificationItems);
  return (
    <Dropdown
      overlayStyle={{ minWidth: "400px" }}
      menu={{
        items: [
          {
            label: (
              <div className="flex justify-between items-center p-3">
                <h1 className="font-bold text-xl">Notifications</h1>
                <a style={{ color: "#504BE4" }}>Clear All</a>
              </div>
            ),
            key: "0",
          },
          {
            type: "divider",
          },
          ...flattenedNotificationItems,
          {
            label: (
              <div
                style={{ color: "#504BE4" }}
                className="text-center hover:underline p-3"
              >
                <Link to="notification">See All Notification</Link>
              </div>
            ),
          },
        ],
      }}
      trigger={["click"]}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Badge
            count={
              Array.isArray(getNotificationdata?.data)
                ? getNotificationdata?.data.filter(
                    (notification) => !notification.seen
                  ).length
                : "0"
            }
            overflowCount={10}
            size="small"
            style={{
              backgroundColor: "red",
            }}
          >
            <IoNotificationsOutline className="text-2xl" />
          </Badge>
        </Space>
      </a>
    </Dropdown>
  );
};
export default Notifi;
