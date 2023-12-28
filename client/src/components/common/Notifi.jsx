import React, { useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { Dropdown, Badge, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchNotifications,
  seenNotify,
} from "../../redux/Features/Notification/notificationSlice";
import { Link } from "react-router-dom";
import moment from "moment";
import { UserOutlined } from '@ant-design/icons';
import PropTypes from "prop-types";
const Notifi = ({headerMobile}) => {

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
         <div className='flex justify-between items-center'>
            <div className='flex space-x-5'>
              <div className='my-auto'>
            {notification.image ? 
              <Avatar src={<img src={notification.image} alt="avatar" />} /> : 
             <Avatar icon={
              <UserOutlined
                className="p-[0.4rem]"
                style={{
                  color: "purple",
                  backgroundColor: "#F8F8FB",
                  borderRadius: 40,
                }}
              />} />
            }
             </div>
            <div>
            <span className='block font-bold'>{notification.title}</span>
                <span className='block'>{notification.message}</span>
                <span className='block text-gray-400 text-xs mx-1'>{moment(notification.createdAt).fromNow()}</span>
              </div>
            </div>
                        <div>
                        <Badge status="default" color='#6560F0' style={{ fontSize: '24px' }} />
                      </div>
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
      overlayStyle={{ minWidth: headerMobile ? 316 : 400 }}
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
      placement={`${headerMobile ? 'bottom' : 'bottomRight'}`}
      trigger={["click"]}
    >
      <span onClick={(e) => e.preventDefault()}>
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
              backgroundColor: "#6560F0",
              margin: "2px"
            }}
          >
            <IoNotificationsOutline className="text-2xl cursor-pointer" />
          </Badge>
      </span>
    </Dropdown>
  );
};

Notifi.propTypes = {
  headerMobile:PropTypes.bool,
};

export default Notifi;
