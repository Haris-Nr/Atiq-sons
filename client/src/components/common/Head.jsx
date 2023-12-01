import { Badge, List, Drawer, notification } from "antd";
import { Header } from "antd/es/layout/layout";
import { IoNotificationsSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import React from "react";

const Head = () => {
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
      <Header className="flex items-center justify-between  bg-blue-400 shadow-2xl">
        <h1 className="text-2xl font-bold lg:text-2xl xl:text-3xl duration-500">
          Lahore Dashboard
        </h1>
        <div className="flex items-center justify-center space-x-6">
          <Badge
            count={11}
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
              User@gmail.com
            </span>
          </div>
        </div>
      </Header>
    </>
  );
};

export default Head;
