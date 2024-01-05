import React from 'react';
import { Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import TaskButton from './TaskButton';

const AdminTaskTable = () => {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.task.tasksForEmployee);

  

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "employee",
      width: 300,
    },
    {
      title: "Task",
      dataIndex: "task",
      width: 300,
    },
    {
      title: "Due Date",
      dataIndex: "date",
      width: 50,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 50,
      render: (_, { status }) => (
        <Tag color="red">
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      width: 50,
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/task/edit/${record.id}`}>Completed</Link>
        </Space>
      ),
    },
  ];
  
  const head = (
    <div className="flex gap-20">
    <TaskButton  />
  </div>
);

const dataSourceWithKeys = tasks
  ? tasks.map((item) => ({
      ...item,
      key: item._id,
    }))
  : [];

  return (
    <div>
      <Table
        title={() => head}
        dataSource={dataSourceWithKeys}
        columns={columns}
        scroll={{ x: 1500 }}
        pagination={{ pageSize: 8 }}
      />
    </div>
);
};

export default AdminTaskTable;