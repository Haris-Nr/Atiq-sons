import { Button, Space, Table, Tag, Typography } from "antd";
import { Link } from "react-router-dom";

const LahoreTaskTable = () => {
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
  ];

  const columns = [
    {
      title: "Task",
      dataIndex: "task",
    },
    {
      title: "Due Date",
      dataIndex: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, { status }) => (
        <>
          <Tag color="red">{status.toUpperCase()}</Tag>
        </>
      ),
    },
    {
      title: "Action",
      render: (text, record) => (
        <Space size="middle">
          <Button>
            <Link to={`/task/edit/${record.id}`}>Completed</Link>
          </Button>
        </Space>
      ),
    },
  ];
  const heading = <Typography.Title level={4}>Task</Typography.Title>;

  return (
    <div>
      <Table
        title={() => heading}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{
          x: 1100,
        }}
      />
    </div>
  );
};
export default LahoreTaskTable;
