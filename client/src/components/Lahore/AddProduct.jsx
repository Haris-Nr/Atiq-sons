import React from 'react';
import { Form, Input, InputNumber, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UserOutlined } from "@ant-design/icons";
import CustomInput from '../Forms/CustomInput';

const AddProduct = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
    const onChange = (value) => {
    console.log('changed', value);
  };

  const validateImage = (_, file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage;
  };

  return (
    <Form
      name="addProductForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
    >
      <CustomInput
        placeholder="Enter Product Name"
        prefix={<UserOutlined className="site-form-item-icon" />}
        type="text"
        required="true
        "message='Please enter the product name!'
      />
      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Image Upload"
        name="image"
        valuePropName="fileList"
        getValueFromEvent={(e) => e && e.fileList}
        rules={[{ required: true, message: 'Please upload an image!' }]}
      >
        <Upload
          name="image"
          listType="picture-card"
          beforeUpload={validateImage}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        label="ASIN Number"
        name="asinNumber"
        rules={[{ required: true, message: 'Please enter the ASIN number!' }]}
      >
        <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          { required: true, message: 'Please enter the price!' },
          { type: 'number', min: 0, message: 'Price must be a non-negative number!' },
        ]}
      >
        <InputNumber
      
        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
        onChange={onChange}
      
  
        style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label="URL Link"
        name="urlLink"
        rules={[
          { required: true, message: 'Please input the URL link!' },
          { type: 'url', message: 'Please enter a valid URL!' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please select the category!' }]}
      >
       <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Button type="primary" htmlType="submit">
          Add Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProduct;
