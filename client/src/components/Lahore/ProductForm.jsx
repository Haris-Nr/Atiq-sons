import React from 'react';
import { Form, Input, InputNumber, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ProductForm = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
    >
<<<<<<< HEAD
      <Form.Item 
      label="Product Name"
       name="productname" 
       rules={[
=======
      <Form.Item label="Product Name" name="productname" rulesrules={[
>>>>>>> 131a352 (bilal)
            {
              required: true,
              message: "Please enter Product Name!",
            },
            {
              type: "text",
              message: "Enter a Valid Product Name",
            },]}>
        <Input />
      </Form.Item>
    
      <Form.Item label="Quantity" name="quantity" rules={[{ required: true }]}>
        <InputNumber />
      </Form.Item>
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
<<<<<<< HEAD
      <Form.Item 
      label="ASIN"
       name="asin"
        rules={[
            {
              required: true,
              message: "Please enter ASIN number!",
            }
            ]}
            >
=======
      <Form.Item label="ASIN" name="asin" rulesrules={[
            {
              required: true,
              message: "Please enter ASIN number!",
            },]}>
>>>>>>> 131a352 (bilal)
        <Input />
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
        style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label="URL Link"
<<<<<<< HEAD
        name="url"
=======
        name="urlLink"
>>>>>>> 131a352 (bilal)
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
      <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
        <Button type="primary" htmlType="submit" block>
          Add Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
