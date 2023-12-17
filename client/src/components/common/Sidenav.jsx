import React, { useEffect, useState } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { TfiControlForward } from "react-icons/tfi";
import { Button, Divider, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { FaProductHunt } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { FaPersonShelter } from "react-icons/fa6";
import { BsPersonFill } from "react-icons/bs";

const Sidenav = ({ collapsed, toggleCollapsed, setCollapsed, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedKeys, setSelectedKeys] = useState();
  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName.split("/")[2]);
  }, [location.pathname]);
  const items = [
    {
      label: "Dashboard",
      key: "./",
      icon: <AppstoreOutlined />,
    },
    {
      label: "Product",
      key: "product",
      icon: <FaProductHunt />,
    },
    {
      label: "Task",
      key: "task",
      icon: <FaTasks />,
    },
    {
      label: "Log",
      key: "log",
      icon: <FaPersonShelter />,
    },
    {
      label: "Employee",
      key: "empolyee",
      icon: <BsPersonFill />,
    }
  ];

  const siderStyle = {
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    left: 0,
    zIndex: 3,
    width: collapsed ? (isMobile ? 0 : 80) : 200,
  };
  if (isMobile && collapsed) {
    siderStyle.width = 0;
  }
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      style={siderStyle}
      breakpoint="lg"
      collapsedWidth={isMobile ? 0 : 80}
      onBreakpoint={(broken) => setCollapsed(broken)}
      trigger={null}
    >
      <div className="flex items-center p-5 gap-6"> 
      {collapsed ? <div className="text-white font-bold text-3xl">
        <img src="/logo.png" alt="logo" />
      </div> :
        <div className="text-white font-bold text-3xl justify-center flex items-center gap-2">
          <img src="/logo.png" alt="logo" />
          AtiqSons
        </div>
      }
       {collapsed ? null : (
        <Button
          className="block xl:hidden -mb-2"
          type="text"
          MenuFoldOutlined
          icon={collapsed ? <TfiControlForward /> : <TfiControlForward />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: "22px", width: 64, height: 64, color: "white" }}
        />
      )}
      </div>
      {/* <Divider/> */}
      <Menu
        onClick={(item) => {
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={items}
        className="custom-menu text-gray-400"
      />
    </Sider>
  );
};

export default Sidenav;
