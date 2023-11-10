import React from "react";
import { Layout, theme } from "antd";
import Sidenav from "../Common/Sidenav";
import Head from "../Common/Head";
const { Content } = Layout;
const LayOut = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <Sidenav collapsed={collapsed}/>
            <Layout>
               <Head/>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};
export default LayOut;
