<<<<<<< HEAD
import { Badge, List, Drawer, notification } from "antd";
import { Header } from "antd/es/layout/layout";
import { IoNotificationsSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import React from "react";

const Head = () => {
=======
import { Badge, List, Drawer, notification, Button, message as messageApi } from "antd";
import { Header } from "antd/es/layout/layout";
import { IoNotificationsSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/Features/auth/authSlice";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

const Head = ({collapsed,setCollapsed}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { data, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

>>>>>>> 131a352 (bilal)
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  useEffect(() => {
    openNotificationWithIcon("success");
  }, []);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };

  return (
    <>
      {contextHolder}
<<<<<<< HEAD
      <Header className="flex items-center justify-between  bg-blue-400 shadow-2xl">
        <h1 className="text-2xl font-bold lg:text-2xl xl:text-3xl duration-500">
          Lahore Dashboard
        </h1>
        <div className="flex items-center justify-center space-x-6">
=======
      <Header className="flex items-center justify-between lg:mt-7 bg-white shadow-2xl">
      <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        <h1 className="text-2xl font-bold lg:text-2xl xl:text-3xl duration-500">
          {data.dashboard} Dashboard
        </h1>
        <div className="flex items-center space-x-6">
>>>>>>> 131a352 (bilal)
          <Badge
            count={1}
            overflowCount={10}
            size="small"
            style={{
              backgroundColor: "red",
            }}
          >
            <IoNotificationsSharp
              className="text-2xl"
              onClick={() => {
                setNotificationsOpen(true);
              }}
            />
          </Badge>
          <Drawer
            title="Notifications"
            placement="right"
            closable
            onClose={() => {
              setNotificationsOpen(false);
            }}
            open={notificationsOpen}
          >
            <List
              dataSource={["test1", "test2"]}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            ></List>
          </Drawer>
<<<<<<< HEAD
          <div className="inline-flex items-center justify-center">
            <h1 className="mb-6 mr-2 text-xl font-medium text-black origin-left ">
              User
            </h1>
            <span className="mt-5 -ml-12 text-sm text-gray-500 origin-left ">
              User@gmail.com
            </span>
          </div>
=======
          <div className="flex space-x-6 items-center">
            <h1 className="text-xl font-medium text-black hidden sm:block">
              {data.fullname}
            </h1>
            <span className="text-sm text-gray-500 hidden sm:block">
              {data.role}
            </span>

          </div>
          <Button
            size="large"
            className="font-bold bg-red-500"
            onClick={() => {
              localStorage.removeItem("token")
              messageApi.success(`${data.fullname} logout successfully`)
              navigate("/");
            }}
          >
            logout
          </Button>
>>>>>>> 131a352 (bilal)
        </div>
      </Header>
    </>
  );
};

export default Head;
