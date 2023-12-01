import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Head from "../common/Head";
import Sidenav from "../common/Sidenav";
import CrumBread from "../common/CrumBread";
import Foot from "../common/Foot";
const { Content } = Layout;

const DashboardLayOut = () => {
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
