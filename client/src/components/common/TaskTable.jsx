<<<<<<< HEAD
import { Button, Space, Table, Tag, Typography } from "antd";
import { Link } from "react-router-dom";
=======
import { Button, Space, Table, Tag, Typography, Affix } from "antd";
import { Link } from "react-router-dom";
import TaskButton from "../Admin/TaskButton";

>>>>>>> 131a352 (bilal)

const Task = () => {

  const dataSource = [
    {
      key: '1',
      task: 'Mike lorem latin 1 task task task task task task task task task task task task task task task task task',
      date: "2/23/2023",
      status: 'incomplete',
    },
    {
      key: '2',
      task: 'John',
      date: 42,
      status: '10 Downing Street',
    },
    {
      key: '3',
      task: 'Mike lorem latin 1 task task task task task task task task task task task task task task task task task',
      date: "2/23/2023",
      status: 'incomplete',
    },
    {
      key: '4',
      task: 'John',
      date: 42,
      status: '10 Downing Street',
    },
    {
      key: '5',
      task: 'Mike lorem latin 1 task task task task task task task task task task task task task task task task task',
      date: "2/23/2023",
      status: 'incomplete',
    },
    {
      key: '6',
      task: 'John',
      date: 42,
      status: '10 Downing Street',
    },
    {
      key: '7',
      task: 'Mike lorem latin 1 task task task task task task task task task task task task task task task task task',
      date: "2/23/2023",
      status: 'incomplete',
    },
    {
      key: '8',
      task: 'John',
      date: 42,
      status: '10 Downing Street',
    },
    {
      key: '9',
<<<<<<< HEAD
      task: 'Mike lorem latin 1 task task task task task task task task task task task task task task task task task',
=======
      task: 'Mike lorem latin 1 task task task task task task task task task task task task task',
>>>>>>> 131a352 (bilal)
      date: "2/23/2023",
      status: 'incomplete',
    },
    {
      key: '10',
      task: 'John',
      date: 42,
      status: '10 Downing Street',
    },
<<<<<<< HEAD
    {
      key: '11',
      task: 'Mike lorem latin 1 task task task task task task task task task task task task task task task task task',
      date: "2/23/2023",
      status: 'incomplete',
    },
    {
      key: '12',
      task: 'John',
      date: 42,
      status: '10 Downing Street',
    },
=======
>>>>>>> 131a352 (bilal)
  ];

  const columns = [
    
      {
        title: "Task",
        dataIndex: "task",
<<<<<<< HEAD
        width:300,
=======
        width:300,  
        key: "task",
        className:"bg-purple-50",
>>>>>>> 131a352 (bilal)
      },
      {
        title:"Due Date",
        dataIndex: "date",
        width:50,
<<<<<<< HEAD
=======
        key: "date",
        className:"bg-purple-50",
>>>>>>> 131a352 (bilal)
      },
      {
        title: "Status",
        dataIndex: "status",
        width:50,
<<<<<<< HEAD
        render: (_, { status }) => (
          <>
           <Tag color="red">
=======
        key: "status",
        className:"bg-purple-50",
        render: (_, { status }) => (
          <>
           <Tag color="purple">
>>>>>>> 131a352 (bilal)
                  {status.toUpperCase()}
            </Tag>
          </>
        ),
      },
      {
        title: "Action",
        width:50,
<<<<<<< HEAD
=======
        key: "action",
        className:"bg-purple-50",
>>>>>>> 131a352 (bilal)
        render: (text, record) => (
          <Space size="middle">
            <Button>
            <Link to={`/task/edit/${record.id}`}>Completed</Link>
            </Button>
          </Space>
        ),
      }
  ];

  return (
    <div>
<<<<<<< HEAD
      <Typography.Title level={4}>Tasks</Typography.Title>
      <Table
      className="bg-blue-400"
=======
      <div  className="bg-white flex items-center justify-between">
      <Typography.Title level={4}>Tasks</Typography.Title>
      <TaskButton/> 
      </div>
      <Table
      className="bg-purple-50"
>>>>>>> 131a352 (bilal)
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
export default Task;