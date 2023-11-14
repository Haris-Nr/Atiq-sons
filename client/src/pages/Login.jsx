import React, { useEffect, useState } from "react";
import CustomInput from "../components/Common/CustomInput";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
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
        <h3 className="text-blue-800 font-bold text-xl">Login to Dashboard</h3>
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
        >
          <CustomInput
            label="Email"
            placeholder="Enter Your Email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            required="true"
            message="Please input your E-mail"
          />
          <CustomInput
            label="Password"
            placeholder="Enter Your Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            required="true"
            message="Please input your password"
          />
          <Form.Item>
            <Link className="login-form-forgot" to="">
              Forgot password
            </Link>
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                className=" login-form-button bg-blue-500 "
                htmlType="submit"
                disabled={
                  !clientReady ||
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Log in
              </Button>
            )}
          </Form.Item>
          <Form.Item>
          Don&#39;t have an account? 
            <Link to="/signup"> register now!</Link>
          </Form.Item>
        </Form>
      </div>
  );
};

export default Login;
