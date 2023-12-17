import { Button, Space, Table, Tag, Typography } from "antd";
import { Link } from "react-router-dom";

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
   
  
  

  
  ];

  const columns = [
    
      {
        title: "Task",
        dataIndex: "task",
        className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',
        
      },
      {
        title:"Due Date",
        dataIndex: "date",
        className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',
      },
      {
        title: "Status",
        dataIndex: "status",
      
        className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',
        render: (_, { status }) => (
          <>
           <Tag color="red">
                  {status.toUpperCase()}
            </Tag>
          </>
        ),
      },
      {
        title: "Action",
 
        className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',
        render: (text, record) => (
          <Space size="middle">
            <Button>
            <Link to={`/task/edit/${record.id}`}>Completed</Link>
            </Button>
          </Space>
        ),
      }
  ];
  const heading = [
    <Typography.Title level={4}>Recent Task</Typography.Title>
  ];


  return (
    <div>
 
      <Table
title={() =>heading}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{
          x: 1100,
        }}
      />
    </div>
  );
}
export default Task;
