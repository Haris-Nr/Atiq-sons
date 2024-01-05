import { Button, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { TasksForEmployee } from "../../redux/Features/Task/taskSlice";

const TaskTable = () => {
    const dispatch = useDispatch()
    const { fetchtaskData } = useSelector((state)=>state.task)

    useEffect(()=>{
        dispatch(TasksForEmployee())
    },[dispatch])


  const columns = [
    {
      title: "Task",
      dataIndex: "taskDetails",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
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

  const dataSourceWithKeys = fetchtaskData?.data
  ? fetchtaskData?.data.map((item,index) => ({ ...item, key: index++ }))
  : [];

  return (
      <Table
        columns={columns}
        dataSource={dataSourceWithKeys}
        pagination={{
          pageSize: 8,
        }}
        scroll={{
          x: 1500,
        }}
      />
  );
};
export default TaskTable;
