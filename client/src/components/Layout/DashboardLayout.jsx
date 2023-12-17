import React, { useEffect, useState } from "react";

import { Layout, Spin, message, theme } from "antd";
import Sidenav from "../common/Sidenav";
import Head from "../common/Head";
import CrumBread from "../common/CrumBread";
import { Outlet, useNavigate } from "react-router-dom";
import Foot from "../common/Foot";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/Features/auth/fetchSlice";
const { Content } = Layout;

const DashboardLayout2 = () => {

    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const {user} = useSelector((state)=> state.fetch)

    const dispatch = useDispatch()



    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }else{
            dispatch(fetchUser())
        }
    } catch (error) {
        message.error(error.message)
        }
        
    }, [dispatch,navigate])
    

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
            if (window.innerWidth <= 1024) {
                setCollapsed(true); // Automatically collapse the sidebar on small screens
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleCollapsed = () => {
        // For mobile view, always toggle between collapsed and expanded
        if (isMobile) {
            setCollapsed(!collapsed);
        } else {
            // For larger screens, only collapse if it's not already collapsed
            setCollapsed(collapsed ? false : true);
        }
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()
    return (
        <Layout hasSider> 
            <Sidenav
                collapsed={collapsed}
                toggleCollapsed={toggleCollapsed}
                setCollapsed={setCollapsed}
                isMobile={isMobile}
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
    );
};
export default DashboardLayout2;