import { Menu } from 'antd'
import { Header } from 'antd/es/layout/layout'
import React from 'react'

const items1 = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const Head = () => {
 
  return (
    
     <Header
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["2"]}
                    items={items1}
                />
            </Header>

  )
}

export default Head