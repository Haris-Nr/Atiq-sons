import React from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Button } from "antd";
import { useDispatch, useSelector } from 'react-redux';
const { Header } = Layout;
const Head = () => {
    // const [collapsed, setCollapsed] = useState(false);

    const toggle = useSelector((state)=>state.)

  return (
    
    <Header
    style={{
        padding: 0,
        background: colorBgContainer,
    }}
>
    <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
            fontSize: "16px",
            width: 64,
            height: 64,
        }}
    />
</Header>

  )
}

export default Head