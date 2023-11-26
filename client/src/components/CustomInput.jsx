/* eslint-disable react/prop-types */
import { Form, Input } from 'antd'
import React from 'react'

const CustomInput = ({ label, placeholder, prefix, className, type, required, message }) => {
    return (
      <Form.Item
      label={label}
      name={label}
      rules={[
        { type: type, message:message},
        { required: required, message: message }
      ]}
    >
      <Input placeholder={placeholder} prefix={prefix} className={className} />
    </Form.Item> 
    );
  };

export default CustomInput