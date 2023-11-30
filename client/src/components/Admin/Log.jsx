import { Space, Table, Typography } from "antd";
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

  return (
    <Space size={20} direction="vertical"  className="flex flex-col min-w-full py-2 overflow-x-auto sm:-mx-6 lg:-mx-8 sm:px-6 lg:px-8">
      <Typography.Title level={4}>Logs</Typography.Title>
      <Table className="min-w-full text-sm font-light text-left"
        loading={loading}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "UserName",
            dataIndex: "userName",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Work",
            dataIndex: "work",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Login Time",
            dataIndex: "login",
          },
          {
            title: "LogOut Time",
            dataIndex: "logout",
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default Log;