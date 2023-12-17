import { Table, Typography } from "antd";

import React from 'react'

const  LogTable  = () => {

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',

    },
    {
      title: "Name",
      dataIndex: "Name",
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',

      render: (value) => <span>{value}</span>,
    },
    {
      title: "Dashboard",
      dataIndex: "dashboard",
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',

      render: (value) => <span>{value}</span>,
    },
    {
      title: "Login Time",
      dataIndex: "login",
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',

    },
    {
      title: "LogOut Time",
      dataIndex: "logout",
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',

    },
  ]

  return (
    <div>
      <Typography.Title level={4}>Logs</Typography.Title>
      <Table
        columns={columns}
        pagination={{
          pageSize: 8,
        }}
        scroll={{
          x: 1500,
        }}
      />
    </div>
  );
}
export default LogTable;
