import { Table } from "antd";
import React from "react";

const TableData = () => {
  const dataSource = [
    {
      key: "1",
      srno:"1",
      productname: "Mike",
      asin: 32,
      date: "10 Downing Street",
    },
    {
      key: "2",
      srno:"2",
      productname: "John",
      asin: 42,
      date: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srno",
      key: "srno",
    },
    {
      title: "ProductName",
      dataIndex: "productname",
      key: "productname",
    },
    {
      title: "Asin",
      dataIndex: "asin",
      key: "asin",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};

export default TableData;
