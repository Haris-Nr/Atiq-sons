import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd';
// import { UserOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

const TaskForm = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Handle form submission logic here
  };

  return (
    <Form
      name="taskForm"
      onFinish={onFinish}
    
    >
      <Form.Item
        label="Task Details"
        name="taskDetails"
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>
      
      <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item>
   

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Asign Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
