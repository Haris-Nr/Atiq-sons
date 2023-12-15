import React, { useEffect, useState } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { FaProductHunt } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { FaPersonShelter } from "react-icons/fa6";
import { BsPersonFill } from "react-icons/bs";

const Sidenav = ({collapsed, toggleSidebar , isInline=false}) => {
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
      className:"forPurple",
    },
    {
      label: "Product",
      key: "product",
      icon: <FaProductHunt />,
      className:"forPurple",
    },
    {
      label: "Task",
      key: "task",
      icon: <FaTasks />,
      className:"forPurple",
    },
    {
      label:"Log",
      key:"log",
      icon:<FaPersonShelter />,
      className:"forPurple",
    },
    {
      label:"Employee",
      key:"empolyee",
      icon:<BsPersonFill />,
      className:"forPurple",
    }
  ];
  return (
    <Sider
    trigger={null} collapsible collapsed={collapsed}
    // onClick={toggleSidebar}
    // className="sidebar"
      breakpoint={"md"}
      // theme="light"
      collapsedWidth={0}
    >
       <div className="text-white text-3xl" style={{
          padding: "30px",
          background: "#2B2A3F",
          color: "#FFFFFF",
      }}  >AtiqSons</div>
      <hr  />
      <Menu
        className="h-full"
        style={{
          padding: "10px",
          background: "#2B2A3F",
          color: "#FFFFFF",
      }}
        mode="vertical"
        onClick={(item) => {
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={items}
      />
    </Sider>
  );
};

export default Sidenav;
