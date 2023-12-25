import { Table } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';

const NotifyTable = () => {

    const { getNotificationdata } = useSelector((state)=> state.notifications)
    const {user} = useSelector((state)=> state.fetch)
    const userrole = user?.employee?.role;

    console.log(userrole)

          const columns = [
        
          {
            title: "Title",
            dataIndex: "title",
            
          },
          {
            title: "Message",
            dataIndex: "message",
            
          },
          {
            title: "Admin",
            dataIndex: "user",
            
          },
          {
            title: "Emplyee",
            dataIndex: "whichUser",
            
          },
      
      ];
  return (
    <div> <Table

    columns={columns}
    dataSource={getNotificationdata.data}
    pagination={false}
    scroll={{
      x: 1100,
    }}
  /></div>
  )
}

export default NotifyTable