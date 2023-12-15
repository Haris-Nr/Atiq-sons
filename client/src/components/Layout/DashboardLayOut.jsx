import React, { useState } from "react";
import {  Layout } from "antd";
import { Outlet } from "react-router-dom";
import Head from "../common/Head";
import Sidenav from "../common/Sidenav";
import CrumBread from "../common/CrumBread";
import Foot from "../common/Foot";
const { Content } = Layout;

const DashboardLayOut = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        
        setCollapsed(!collapsed);
    };


    return (
        <>
            <Layout className="min-h-screen">
                <Layout>
                    <Sidenav collapsed={collapsed} 
                    />
                    <Layout
                        className="md:p-10 p-2"
                        style={{
                            background: "#F2F1F9"
                        }}
                    >
                        <Head collapsed={collapsed} toggleCollapsed={toggleCollapsed}
                        />
                        <CrumBread />
                        <Content className="p-2 md:p-5 bg-white">
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
