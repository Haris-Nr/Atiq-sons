import React, { useEffect, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
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
      <h3 className="text-blue-800 font-bold text-lg pb-5">
        Login to Dashboard
      </h3>
      <Form form={form} name="loginForm" onFinish={onFinish} size="large" layout="vertical">
        <Form.Item
          name="email"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
            {
              type: "email",
              message: "Enter a valid email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Enter your Email"
            className="text-lg"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="Enter Your Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            className="text-lg"
          />
        </Form.Item>
        <Form.Item className="text-right">
          <Link className="login-form-forgot" to="/forgetpassword">
            Forgot password
          </Link>
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
            type="primary" 
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
              Log In
            </Button>
          )}
        </Form.Item>
        <Form.Item>
          Don&#39;t have an account?&nbsp;
          <Link to="/signup" className="text-blue-400 underline">
            register now!
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
