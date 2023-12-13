import { Table, Typography } from "antd";

import React from 'react'

const  LogTable  = () => {

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "Name",
      render: (value) => <span>{value}</span>,
    },
    {
      title: "Dashboard",
      dataIndex: "dashboard",
      render: (value) => <span>{value}</span>,
    },
    {
      title: "Login Time",
      dataIndex: "login",
    },
    {
      title: "LogOut Time",
      dataIndex: "logout",
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