import React, { useEffect, useState } from "react";
import { AppstoreOutlined,MenuFoldOutlined,
  MenuUnfoldOutlined, } from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { FaProductHunt } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { FaPersonShelter } from "react-icons/fa6";
import { BsPersonFill } from "react-icons/bs";

const Sidenav = ({collapsed,toggleCollapsed,setCollapsed,isMobile}) => {
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
      {collapsed ? null : (
                    <Button
                        type="text"
                        MenuFoldOutlined
                        icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: "16px", width: 64, height: 64,color:"white" }}
                    />
                )}
       <div>AtiqSons</div>
      <hr  />
      <Menu
        onClick={(item) => {
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={items}
        className="custom-menu"
      />
    </Sider>
  );
};

export default Sidenav;
