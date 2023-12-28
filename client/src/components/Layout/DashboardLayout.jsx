import React, { useEffect, useState } from "react";
import { Layout, message, theme } from "antd";
import Sidenav from "../common/Sidenav";
import Head from "../common/Head";
import CrumBread from "../common/CrumBread";
import { Outlet, useNavigate } from "react-router-dom";
import Foot from "../common/Foot";
import { useDispatch, useSelector } from "react-redux";
const { Content } = Layout;
import { fetchUser } from "../../redux/Features/auth/fetchSlice";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1440);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.fetch);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
      } else {
        dispatch(fetchUser());
      }
    } catch (error) {
      message.error(error.message);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1440);
      if (window.innerWidth <= 1440) {
        setCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCollapsed = () => {
    if (isMobile) {
      setCollapsed(!collapsed);
    } else {
      setCollapsed(collapsed ? false : true);
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout hasSider>
        <Sidenav
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
          setCollapsed={setCollapsed}
          isMobile={isMobile}
          user={user}
        />
        <Layout
          style={{
            marginLeft: isMobile ? 0 : collapsed ? 80 : 200,
            transition: "margin-left 0.2s",
          }}
        >
          <Head
            collapsed={collapsed}
            toggleCollapsed={toggleCollapsed}
            isMobile={isMobile}
            user={user}
          />
          <Content
            style={{ marginTop: 64, margin: "64px 0px 0px 0px", padding: 14 }}
          >
            <CrumBread />
            <div
              style={{
                padding: 24,
                minHeight: 360,
                textAlign: "center",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Foot />
        </Layout>
      </Layout>
    </>
  );
};
export default DashboardLayout;
