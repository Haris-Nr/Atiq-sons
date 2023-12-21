import React from "react";
import { Badge, Button, Flex, Typography } from "antd";
import { TfiAlignRight, TfiAlignLeft } from "react-icons/tfi";
import { Header } from "antd/es/layout/layout";
import { IoNotificationsOutline } from "react-icons/io5";
import LogoutButton from "./LogoutButton";

const Head = ({ collapsed, toggleCollapsed, isMobile, user }) => {
  const { employee } = user;

  const headerStyle = {
    position: "fixed",
    zIndex: 1,
    width: `calc(100% - ${isMobile ? 50 : collapsed ? 110 : 230}px)`,
    margin: `16px ${isMobile ? 16 : collapsed ? 80 : 200}px 24px`,
    left: 0,
    top: 0,
    boxSizing: "border-box",
    transition: "all 0.2s",
    marginLeft: isMobile ? "16px" : collapsed ? "96px" : "216px",
    marginRight: "16px",
  };

  return (
    <Header style={headerStyle}>
      <Flex align="center" justify="space-between">
        <Flex justify="center" align="center" className="mt-1">
          <Button
            type="text"
            icon={collapsed ? <TfiAlignLeft /> : <TfiAlignRight />}
            onClick={toggleCollapsed}
            style={{
              fontSize: "24px",
              width: 64,
              height: 38,
              marginLeft: "-50px",
            }}
          />
          <Typography.Text className="text-clip font-bold">
            {employee?.dashboard.charAt(0).toUpperCase() +
              employee?.dashboard.slice(1) +
              " " +
              "Dashboard"}
          </Typography.Text>
        </Flex>
        <Flex justify="center" align="center" gap={16} className="mt-2 mr-6">
          <Badge
            count={1}
            overflowCount={10}
            size="small"
            style={{
              backgroundColor: "red",
            }}
          >
            <IoNotificationsOutline className="text-2xl" />
          </Badge>
          <Flex vertical justify="center" wrap="wrap">
            <Typography.Text className="text-lg font-bold">
              {employee?.fullname.charAt(0).toUpperCase() +
                employee?.fullname.slice(1)}
            </Typography.Text>
            <Typography.Text className="text-clip font-normal">
              {employee?.role}
            </Typography.Text>
          </Flex>
          <LogoutButton />
        </Flex>
      </Flex>
    </Header>
  );
};

export default Head;
