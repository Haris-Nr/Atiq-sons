import { Avatar, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers } from "..";
import { Link } from "react-router-dom";

function Empolyee() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res.users);
      setLoading(false);
    });
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "image",
      render: (link) => {
        return <Avatar   src={link}  />;
      },
    },
    {
      title: "Name",
      dataIndex: "firstName",
    },
    {
      title: "Dashboard",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },

    {
      title: "address",
      dataIndex: "address",
      render: (address) => {
        return (
          <span className="">
            {address.address}, {address.city}
          </span>
        );
      },
    },
    {
      title:"Status",
      dataSource: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => {
        return (
          <Space size="middle">
            <Link>Edit</Link>
          </Space>
        );
      },
    }
  ]
  return (
    <div>
      <Typography.Title level={4}>Empolyee</Typography.Title>
      <Table
        loading={loading}
        columns={columns}
        responsive="stack"
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
export default Empolyee;