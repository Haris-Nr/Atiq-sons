import React from 'react';
import { Form, Input, DatePicker, TimePicker, Button } from 'antd';
import { UserOutlined } from "@ant-design/icons";
import CustomInput from '../Forms/CustomInput';

const AddTask = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Handle form submission logic here
  };

  return (
    <Form
      name="taskForm"
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
    >
       <CustomInput
        placeholder="Enter Title"
        prefix={<UserOutlined className="site-form-item-icon" />}
        type="text"
        required="true
        "message='Please input the title!'
        
      />
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input the title!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: 'Please select the date!' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Time"
        name="time"
        rules={[{ required: true, message: 'Please select the time!' }]}
      >
        <TimePicker />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Button type="primary" htmlType="submit">
          Add Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddTask;
