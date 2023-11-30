/* eslint-disable no-unused-vars */
import { Menu, Badge, Typography, List, Drawer } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { BellOutlined, MessageOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getComments, getOrders } from "../index";
import React from 'react';

const Head = () => {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  return (
    <Header className="flex items-center justify-between  bg-white border-b">

    <h1 className="text-2xl font-bold lg:text-2xl xl:text-4xl">
      Lahore Dashboard
    </h1>


    <div className='flex items-center justify-center space-x-6'>

    
        <Badge count={comments.length}>
          <MessageOutlined 
            style={{ fontSize: 24 }}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge count={orders.length}>
          <BellOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge>
        <Drawer
          title="Comments"
          placement="right"
          width={300}
          closable
          onClose={() => {
            setCommentsOpen(false);
          }}
          open={commentsOpen}
        >
          <List
            dataSource={comments}
            renderItem={(item) => {
              return <List.Item>{item.body}</List.Item>;
            }}
          ></List>
        </Drawer>
        <Drawer
          title="Notifications"
          placement="right"
          width={300}
          closable
          onClose={() => {
            setNotificationsOpen(false);
          }}
          open={notificationsOpen}
        >
          <List
            dataSource={orders}
            renderItem={(item) => {
              return (
                <List.Item>
                  <Typography.Text strong>{item.title}</Typography.Text> has
                  been ordered!
                </List.Item>
              );
            }}
          ></List>
          
        </Drawer>
        <div className="inline-flex items-center justify-center">
  <h1 className="mb-6 mr-2 text-xl font-medium text-black origin-left ">
    User
  </h1>
<span className="mt-5 -ml-12 text-sm text-gray-500 origin-left ">User@gmail.com</span>
</div>
</div>
    </Header>
  );
};

export default Head;
