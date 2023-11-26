import React, { useEffect, useState } from "react";
import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";

const Sidenav = ({ colorBgContainer }) => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();

  return (
    <Sider>
      <Menu
        className="bottom-0 h-full "
        mode="vertical"
        onClick={(item) => {
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
      >
        <Menu.Item key="/admin" icon={<AppstoreOutlined />}>
       {/* <NavLink to="/admin"> Dashboard </NavLink>    */}
       Dashboard
        </Menu.Item>
        <Menu.Item key="product" icon={<ShopOutlined />}>
          Product
        </Menu.Item>
        <Menu.Item key="task" icon={<ShoppingCartOutlined />}>
        {/* <NavLink to="task"> Task </NavLink> */}
        Task
        </Menu.Item>
        <Menu.Item key="custom" icon={<UserOutlined />}>
          Custom
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidenav;

