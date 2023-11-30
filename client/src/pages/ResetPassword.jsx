import React, { useEffect, useState } from "react";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  // To disable submit button at the beginning.
  useEffect(() => {
    setClientReady(true);
  }, []);
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    
      <div>
        <h3 className="text-blue-800 font-bold text-lg  pb-5">Reset Password</h3>
        <Form
          form={form}
          style={{ maxWidth: 400 }}
          name="resetPassword"
          onFinish={onFinish}
        >
<Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
      hasFeedback
    >
      <Input.Password placeholder="Enter Your Password" prefix={<LockOutlined className="site-form-item-icon" />} className="sm:text-lg" />
    </Form.Item>

    <Form.Item
      name="confirmPassword"
      dependencies={['password']}
      rules={[
        {
          required: true,
          message: 'Please confirm your password!',
        },
        ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
      ]}
      hasFeedback
    >
      <Input.Password placeholder="Enter Your Confirm Password" prefix={<LockOutlined className="site-form-item-icon" />} className="sm:text-lg" />
    </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
            <Link to="/">
              <Button
                block
                className="font-bold" 
                htmlType="submit"
                shape="round"
                disabled={
                  !clientReady ||
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Reset Password
              </Button>
              </Link>
            )}
          </Form.Item>
        </Form>
      </div>
  );
};

export default ResetPassword;
