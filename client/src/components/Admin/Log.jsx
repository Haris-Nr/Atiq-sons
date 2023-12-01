import { Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getOrders } from "..";

function Log() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

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
        loading={loading}
        columns={columns}
        dataSource={dataSource}
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
export default Log;