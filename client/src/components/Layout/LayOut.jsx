import React from "react";
import { Layout, theme } from "antd";
import Head from "../Common/Head";
import Sidenav from "../Common/Sidenav";
import Foot from "../Common/Foot";
import CrumBread from "../Common/CrumBread";
import { Outlet } from "react-router-dom";
const { Content } = Layout;

const LayOut = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout className="min-h-screen">
            <Head />
            <Layout>
                <Sidenav colorBgContainer={colorBgContainer} />
                <Layout
                    style={{
                        padding: "0 24px 24px",
                    }}
                >
                    <CrumBread />
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet />
                    </Content>
                    <Foot />
                </Layout>
            </Layout>
        </Layout>
    );
};
export default LayOut;
