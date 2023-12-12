<<<<<<< HEAD
import React from "react";
=======
import React, { useState } from "react";
>>>>>>> 131a352 (bilal)
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Head from "../common/Head";
import Sidenav from "../common/Sidenav";
import CrumBread from "../common/CrumBread";
<<<<<<< HEAD
=======


>>>>>>> 131a352 (bilal)
import Foot from "../common/Foot";
const { Content } = Layout;

const DashboardLayOut = () => {
<<<<<<< HEAD
    return (
        <>
            <Layout className="min-h-screen">
                <Head />
                <Layout>
                    <Sidenav />
                    <Layout
                        style={{
                            padding: "0 20px 24px",
                        }}
                    >
                        <CrumBread />
                        <Content className="p-5 bg-blue-300">
=======
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <Layout className="min-h-screen">
                <Sidenav  collapsed={collapsed}/>
                <Layout  style={{
                            padding: "0 20px 24px",
                            background: "#f9f0ff"
                        }}>
                    <Layout
                        style={{
                            padding: "0 20px 24px",
                            background: "#f9f0ff"
                        }}
                    >
                        <Head setCollapsed={setCollapsed} collapsed={collapsed} />
                        <CrumBread />
                        <Content className="p-5 bg-white">
>>>>>>> 131a352 (bilal)
                            <Outlet />
                        </Content>
                        <Foot />
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
};
export default DashboardLayOut;
