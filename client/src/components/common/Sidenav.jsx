import React, { useEffect, useState } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { TfiControlForward } from "react-icons/tfi";
import { Button, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { FaProductHunt } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { FaPersonShelter } from "react-icons/fa6";
import { BsPersonFill } from "react-icons/bs";
import PropTypes from "prop-types";

const Sidenav = ({
  collapsed,
  toggleCollapsed,
  setCollapsed,
  isMobile,
  user,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedKeys, setSelectedKeys] = useState();

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName.split("/")[2]);
  }, [location.pathname]);

  const employeeDashboard = user?.employee?.dashboard;

  const items = [
    {
      label: "Dashboard",
      key: ".",
      path: "relative",
      icon: <AppstoreOutlined />,
    },
    // lahore
    employeeDashboard === "lahore" && {
      label: "Product",
      key: "lahoreproducttable",
      icon: <FaProductHunt />,
    },
    employeeDashboard === "lahore" && {
      label: "Task",
      key: "tasktable",
      icon: <FaTasks />,
    },
    // dubai
    employeeDashboard === "dubai" && {
      label: "Product",
      key: "dubaiproducttable",
      icon: <FaProductHunt />,
    },
    //admin
    employeeDashboard === "admin" && {
      label: "Employee",
      key: "employees",
      icon: <BsPersonFill />,
    },
    employeeDashboard === "admin" && {
      label: "Logs",
      key: "logs",
      icon: <FaPersonShelter />,
    },
    employeeDashboard === "admin" && {
      label: "Products",
      key: "productTable",
      icon: <FaProductHunt />,
    },
  ].filter(Boolean);

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
        {collapsed ? (
          <div className="text-white font-bold text-3xl">
            <img src="/logo.png" alt="logo" />
          </div>
        ) : (
          <div className="text-white font-bold text-3xl justify-center flex items-center gap-2">
            <img src="/logo.png" alt="logo" />
            AtiqSons
          </div>
        )}
        {collapsed ? null : (
          <Button
            className="-mb-2"
            type="text"
            icon={
              !collapsed ? <TfiControlForward className="2xl:hidden" /> : null
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "22px", width: 64, height: 64, color: "white" }}
          />
        )}
      </div>
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

Sidenav.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggleCollapsed: PropTypes.func.isRequired,
  setCollapsed: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default Sidenav;
