import React, { useEffect, useState } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { FaProductHunt } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { FaPersonShelter } from "react-icons/fa6";
import { BsPersonFill } from "react-icons/bs";

const Sidenav = () => {
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
      label:"Log",
      key:"log",
      icon:<FaPersonShelter />,
    },
    {
      label:"Employee",
      key:"empolyee",
      icon:<BsPersonFill />,
    }
  ];
  return (
    <Sider
        breakpoint="lg"
        collapsedWidth="0"
        // onBreakpoint={(broken) => {
        //   console.log(broken);
        // }}
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
    >
      <Menu
        className="h-full "
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
