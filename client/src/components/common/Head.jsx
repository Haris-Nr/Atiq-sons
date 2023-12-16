import React from "react";
import { Badge, Button, Flex, Typography } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { IoNotificationsSharp } from "react-icons/io5";
import Paragraph from "antd/es/typography/Paragraph";

const Head = ({ collapsed, toggleCollapsed, isMobile }) => {
  const headerStyle = {
    position: "fixed",
    zIndex: 1,
    width: `calc(100% - ${isMobile ? 0 : collapsed ? 160 : 280}px)`,
    // width:"100%",
    margin: `16px ${isMobile ? 16 : collapsed ? 80 : 200}px 24px`,
    left: 0,
    top: 0,
    boxSizing: "border-box",
    transition: "all 0.2s",
    marginLeft: isMobile ? "16px" : collapsed ? "96px" : "246px",
    marginRight: "16px",
  };

  return (
    <Header style={headerStyle}>
      <Flex align="center" justify="space-between">
        <Flex justify="center" align="center">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{ fontSize: "16px", width: 64, height: 64, marginLeft:"-50px" }}
          />
          <Typography.Text className="text-sm">Lahore Dashboard</Typography.Text>
        </Flex>
        <Flex justify="center" align="center" gap={2} >
          <Badge
            count={1}
            overflowCount={10}
            size="small"
            style={{
              backgroundColor: "red",
            }}
          >
            <IoNotificationsSharp className="text-2xl" />
          </Badge>
          <Flex vertical gap={0} justify="center"wrap="wrap" >
            <Typography.Text className="text-lg">User</Typography.Text>
            <Paragraph>employee</Paragraph>
          </Flex>
        </Flex>
      </Flex>
    </Header>
  );
};

export default Head;
