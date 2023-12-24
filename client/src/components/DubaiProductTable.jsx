import React from 'react';
import { Button, Table, Space } from 'antd';
import ProductButton from "./ProductButton";



const columns = [
  {
    title: 'SrNo',
    dataIndex: 'productName',
    key: 'productname',
  },
  {
    title: 'Product Name',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'thumbnail',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Quantity',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Category',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Url',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button>Find</Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    productName: 'Product 1',
    price: '$19.99',
    stock: 10,
  },
  {
    key: '2',
    productName: 'Product 2',
    price: '$29.99',
    stock: 15,
  },
  // Add more dummy data as needed
];


const heading = (
  <div className="flex justify-between">
    <div className='font-bold text-xl'>
      Product Table
    </div>
    {/* <ProductButton /> */}
  </div>
);

const DubaiProductTable = () => {
  return (
    <Table
      title={() => heading}
      columns={columns}
      dataSource={data}
      pagination={false} // Disable pagination for simplicity
    />
  );
};

export default DubaiProductTable;
