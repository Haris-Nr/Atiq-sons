import React from "react";
import { Button, Flex, Typography } from "antd";
import { TfiAlignRight, TfiAlignLeft } from "react-icons/tfi";
import { Header } from "antd/es/layout/layout";
import LogoutButton from "./LogoutButton";
import Notifi from "./Notifi";
import PropTypes from "prop-types";

const Head = ({ collapsed, toggleCollapsed, isMobile,headerMobile, user }) => {

  const { employee } = user;

  const headerStyle = {
    position: "fixed",
    zIndex: 1,
    width: `calc(100% - ${isMobile ? 30 : collapsed ? 110 : 230}px)`,
    margin: `16px ${isMobile ? 16 : collapsed ? 80 : 200}px 24px`,
    left: 0,
    top: 0,
    boxSizing: "border-box",
    transition: "all 0.2s",
    marginLeft: isMobile ? "16px" : collapsed ? "96px" : "216px",
    marginRight: "16px",
    height: `calc(8% - ${headerMobile ? -45 : collapsed ? 1 : 2}px)`,
  };

  return (
    <Header style={headerStyle}>
      <Flex style={{ flexDirection: headerMobile ? 'column' : 'row' }}
      align="center" justify="space-between">
        <Flex justify="center" align="center" className="mt-1">
          <Button
            type="text"
            icon={collapsed ? <TfiAlignLeft /> : <TfiAlignRight />}
            onClick={toggleCollapsed}
            style={{
              fontSize: "24px",
              width: 64,
              height: 38,
              marginLeft: "-60px",
            }}
          />
          <Typography.Text className="text-clip font-bold">
            {employee?.dashboard.charAt(0).toUpperCase() +
              employee?.dashboard.slice(1) +
              " " +
              "Dashboard"}
          </Typography.Text>
        </Flex>
        <Flex justify="center" gap={3} className="mt-2 space-x-4 -ml-5 items-start">
          <Notifi  headerMobile={headerMobile} />
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

Head.propTypes = {
  collapsed: PropTypes.bool,
  toggleCollapsed: PropTypes.func,
  isMobile: PropTypes.bool,
  headerMobile:PropTypes.bool,
  user: PropTypes.shape({
    employee: PropTypes.shape({
      fullname: PropTypes.string,
      role: PropTypes.string,
      dashboard: PropTypes.string,
    }),
  }),
};

export default Head;
