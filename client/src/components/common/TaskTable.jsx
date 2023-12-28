import { Button, Space, Table, Tag, Typography } from "antd";
import { Link } from "react-router-dom";

const Task = () => {
  const dataSource = [
    {
      key: "1",
      task: "Mike lorem latin 1 task task task task task task task task task task task task task task task task task",
      date: "2/23/2023",
      status: "incomplete",
    },
    {
      key: "2",
      task: "John",
      date: 42,
      status: "10 Downing Street",
    },
    {
      key: "3",
      task: "Mike lorem latin 1 task task task task task task task task task task task task task task task task task",
      date: "2/23/2023",
      status: "incomplete",
    },
    {
      key: "4",
      task: "John",
      date: 42,
      status: "10 Downing Street",
    },
    {
      key: "5",
      task: "Mike lorem latin 1 task task task task task task task task task task task task task task task task task",
      date: "2/23/2023",
      status: "incomplete",
    },
    {
      key: "6",
      task: "John",
      date: 42,
      status: "10 Downing Street",
    },
    {
      key: "7",
      task: "Mike lorem latin 1 task task task task task task task task task task task task task task task task task",
      date: "2/23/2023",
      status: "incomplete",
    },
    {
      key: "8",
      task: "John",
      date: 42,
      status: "10 Downing Street",
    },
    {
      key: "9",
      task: "Mike lorem latin 1 task task task task task task task task task task task task task task task task task",
      date: "2/23/2023",
      status: "incomplete",
    },
    {
      key: "10",
      task: "John",
      date: 42,
      status: "10 Downing Street",
    },
    {
      key: "11",
      task: "Mike lorem latin 1 task task task task task task task task task task task task task task task task task",
      date: "2/23/2023",
      status: "incomplete",
    },
    {
      key: "12",
      task: "John",
      date: 42,
      status: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Task",
      dataIndex: "task",
      width: 300,
      className:
        "text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer",
    },
    {
      title: "Due Date",
      dataIndex: "date",
      width: 50,
      className:
        "text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer",
    },
    {
      title: "Status",
      dataIndex: "status",
      className:
        "text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer",

      width: 50,
      render: (_, { status }) => (
        <>
          <Tag color="red">{status.toUpperCase()}</Tag>
        </>
      ),
    },
    {
      title: "Action",
      className:
        "text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer",

      width: 50,
      render: (text, record) => (
        <Space size="middle">
          <Button>
            <Link to={`/task/edit/${record.id}`}>Completed</Link>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={4}>Tasks</Typography.Title>
      <Table
        className="bg-blue-400"
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
};
export default Task;
