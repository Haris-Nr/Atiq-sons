
import { Button, Space, Table, Tag, Typography } from "antd";
import { Link } from "react-router-dom";

const NotifiPage = () => {

    const notification = [
        {
     
          task: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          date: "2/23/2023",
     
        },
        {
        
          task: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          date: '2/23/2023',
       
        },
        {
       
          task: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          date: "2/23/2023",
         
        },
       
      
      
    
      
      ];
    
      const columns = [
        
          {
            title: "Name",
            dataIndex: "task",
            className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',
            
          },
          {
            title:"Date",
            dataIndex: "date",
            className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',
          },
      
      ];
     
    
      return (
        <div>
     
          <Table

            columns={columns}
            dataSource={notification}
            pagination={false}
            scroll={{
              x: 1100,
            }}
          />
        </div>
      );
    }
export default NotifiPage;


