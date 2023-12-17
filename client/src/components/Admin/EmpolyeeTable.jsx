import { Avatar, Space, Table, Typography } from "antd";
import { useEffect} from "react";
import { Link } from "react-router-dom";

function Empolyee() {


  useEffect(() => {

  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "image",
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',

      render: (link) => {
        return <Avatar   src={link}  />;
      },
    },
    {
      title: "Name",
      dataIndex: "firstName",
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',

    },
    {
      title: "Dashboard",
      dataIndex: "lastName",
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',

    },
    {
      title: "Email",
      dataIndex: "email",
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',

    },
    {
      title: "Phone",
      dataIndex: "phone",
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',

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
        columns={columns}
        responsive="stack"
        // dataSource={}
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
