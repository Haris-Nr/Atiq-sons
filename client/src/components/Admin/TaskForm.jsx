import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd';
// import { UserOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

import { Select } from 'antd';
const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const TaskForm = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Handle form submission logic here
  };

  return (
    <Form
      name="taskForm"
      onFinish={onFinish}
    labelCol={{span:5}}
    >
      <Form.Item
        label="Task Details"
        name="taskDetails"
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>

      {/* <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item>
    */}
   <Form.Item
   label = "Employee"
   name="employee"
   >
   <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={filterOption}
    options={[
      {
        value: 'jack',
        label: 'Jack',
      },
      {
        value: 'lucy',
        label: 'Lucy',
      },
      {
        value: 'tom',
        label: 'Tom',
      },
    ]}
  />

   </Form.Item>

      <Form.Item
      wrapperCol={{offset:9 , span:7}}
      >
        <Button block type="primary" htmlType="submit">
          Asign Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
