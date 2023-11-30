import React, { useEffect, useState } from "react";
import { LockOutlined, MailOutlined} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import CustomInput from "../components/Forms/CustomInput";

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
        <h3 className="text-blue-800 font-bold text-lg pb-5">Login to Dashboard</h3>
        <Form
          form={form}
          name="loginForm"
          onFinish={onFinish}
        >
          <CustomInput
            name="email"
            placeholder="Enter Your Email"
            prefix={< MailOutlined className="site-form-item-icon" />}
            type="email"
            required="true"
            message="Please input your E-mail"
            className="sm:text-lg"
          />

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
      <Input.Password placeholder="Enter Your Password" prefix={<LockOutlined className="site-form-item-icon" />} className="sm:text-lg"/>
    </Form.Item>

          <Form.Item className="text-right">
            <Link className="login-form-forgot" to="/forgetpassword">
              Forgot password
            </Link>
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
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
                Log In
              </Button>
            )}
          </Form.Item>
          <Form.Item>
          Don&#39;t have an account?&nbsp;
            <Link to="/signup" className="text-blue-400 underline">register now!</Link>
          </Form.Item>
        </Form>
      </div>
  );
};

export default Login;
