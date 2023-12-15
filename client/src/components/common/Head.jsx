import { Badge, List, Drawer, notification, Button } from "antd";
import { Header } from "antd/es/layout/layout";
import { IoNotificationsSharp } from "react-icons/io5";
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { fetchUser } from "../../redux/Features/auth/authSlice";
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

const Head = ({ collapsed, toggleCollapsed, }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { data, isError, isSuccess, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    openNotificationWithIcon("success");
    dispatch(fetchUser());
  }, [dispatch]);
  // useEffect(() => {
  // }, []);

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
      <Header className="flex items-center justify-between  bg-white">
      <div className="flex items-center -ml-12">
      <Button
            // className="lg:block hidden"   
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
            />
             
      
            {/* <button className="block md:hidden" onClick={toggleSidebar}>
                            {isSidebarVisible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </button> */}
        <h1 className="text-2xl font-bold lg:text-2xl xl:text-3xl duration-500">
          Lahore Dashboard
        </h1>
            </div>
        <div className="flex items-center justify-center space-x-6">
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
          <div className="inline-flex items-center justify-center">
            <h1 className="mb-6 mr-2 text-xl font-medium text-black origin-left ">
              User
            </h1>
            <span className="mt-5 -ml-12 text-sm text-gray-500 origin-left ">
              employee
            </span>
          </div>
        </div>
      </Header>
    </>
  );
};

export default Head;
