import React from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { Tag,Dropdown, Space, Divider } from 'antd';
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const items = [
  {
    label: (
      <div className='flex justify-between items-center p-3'>
        <h1 className='font-bold'>Notification(03)</h1>
        <a style={{ color:"#504BE4" }}>Clear All</a>
      </div>
    ),
    key: '0',
  },
  {
    type: 'divider',
  },
  {
    label: <div className='flex justify-start space-x-5 items-center'>
 <DollarCircleOutlined
    className="text-sm md:text-2xl lg:p-4"
    style={{
      color: "green",
      backgroundColor: "#F8F8FB",
      borderRadius: 40,
    }}
  />
  <span>
You have requested to withdrawal <br />
2 hrs ago
  </span>
    </div>,

    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: 
    <div className='flex justify-start space-x-5 items-center'>
 <UserOutlined
    className="text-sm md:text-2xl lg:p-4"
    style={{
      color: "purple",
      backgroundColor: "#F8F8FB",
      borderRadius: 40,
    }}
  />
  <span className=''>
  A new user added in AtiqAons <br/>
  3 hrs ago
  </span>
    </div>,
    key: '2',
  },
  {
    type: 'divider',
  },
  {
    label:  <div className='flex justify-start space-x-5 items-center'>
    <DollarCircleOutlined
        className="text-sm md:text-2xl lg:p-4"
        style={{
          color: "green",
          backgroundColor: "#F8F8FB",
          borderRadius: 40,
        }}
      />
      <span className=''>
      You have requested to withdrawal<br/>
      3 hrs ago
      </span>
        </div>,
    key: '3',
  },
  {
    label: (
      <div style={{ color:"#504BE4" }} className='text-center hover:underline p-3'>
        <a href="">See All Notification</a>
      </div>
    ),
  }
];

const Notifi = () => (
  <Dropdown
    overlayStyle={{ minWidth: '400px' }}
    menu={{
      items,
    }}
    trigger={['click']}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <IoNotificationsOutline className="text-2xl" />
      </Space>
    </a>
  </Dropdown>
);

export default Notifi;
