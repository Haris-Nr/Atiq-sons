import React from 'react';
import { Avatar, Rate, Table, Typography, Dropdown, Button, Input, Menu } from 'antd';
import { EllipsisOutlined, EyeOutlined,DeleteOutlined , EditOutlined} from '@ant-design/icons';
import { PlusCircleOutlined   } from '@ant-design/icons';
import { useState } from "react";

const { Search } = Input;

const LahoreProductTable = () => {
  const [searchText, setSearchText] = useState("");

  const menu = (record) => (
    <Menu>
      <Menu.Item key="edit" icon={<EditOutlined />}>
        <a href={`/edit/${record.key}`}>Edit</a>
      </Menu.Item>
      <Menu.Item key="delete"  icon={<DeleteOutlined />}>Delete</Menu.Item>
      <Menu.Item key="activate" icon={<EyeOutlined  />}>View</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      key: 'thumbnail',
      title: 'Thumbnail',
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',

      dataIndex: 'thumbnail',
      headerColor: 'red',
      render: (link) => <Avatar src={link} />,
    },
    {
      title: 'Product Name',
      dataIndex: 'title',
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',

    },
    {
      title: 'Price',
      dataIndex: 'price',
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',

      render: (value) => <span>${value}</span>,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',

      render: (rating) => <Rate value={rating} allowHalf disabled />,
    },
    {
      title: 'Asin No',
      dataIndex: 'stock',
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',

    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',

    },
    {
      title: 'Category',
      dataIndex: 'category',
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',

    },
    {
      title: 'Seller Name',
      dataIndex: 'category',
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',

    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record) => (
        <Dropdown overlay={menu(record)} placement="bottomLeft" arrow>
          <Button icon={<EllipsisOutlined />}  vertical/>
        </Dropdown>
      ),
    },
  ];
  const dataSource = [
    {
      key: '1',
      thumbnail: 'thumbnail_url_1',
      title: 'Product 1',
      price: 50,
      rating: 4,
      stock: 'ASIN123',
      brand: 'Brand 1',
      category: 'Category 1',
      sellerName: 'Seller 1',
      status: 'available',
    },
    {
      key: '1',
      thumbnail: 'thumbnail_url_1',
      title: 'Product 1',
      price: 50,
      rating: 4,
      stock: 'ASIN123',
      brand: 'Brand 1',
      category: 'Category 1',
      sellerName: 'Seller 1',
      status: 'available',
    },
    {
      key: '1',
      thumbnail: 'thumbnail_url_1',
      title: 'Product 1',
      price: 50,
      rating: 4,
      stock: 'ASIN123',
      brand: 'Brand 1',
      category: 'Category 1',
      sellerName: 'Seller 1',
      status: 'available',
    },
  ];

  const heading = (
    <div className="flex gap-20 " >
   
    <Input.Search
     
      placeholder="Search Product..."
      size="medium"
      style={{ marginBottom: 2, width: '30%' }}
      onSearch={(value) => setSearchText(value)}
    />
    <div className=" relative w-full px-4 max-w-full flex-grow flex-1 text-right " >
       <Button
    className=" text-white group-hover:text-gray-900   bg-indigo-500 focus:bg-indigo-600 ..."
      shape="round"
      icon={<PlusCircleOutlined   />}
      size="medium"
     
    >
      Add Product
    </Button>
    </div>
  </div>
  );

  return (
    <div>
      <Table
        title={() => heading}
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: 1100,
        }}
        pagination={false}
      />
    </div>
  );
};

export default LahoreProductTable;
