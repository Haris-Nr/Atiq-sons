import React, { useEffect, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from "../redux/Features/auth/authSlice";
import { fetchUser } from "../redux/Features/auth/fetchSlice";

const Login = () => {

  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {data} = useSelector((state)=> state.auth)
  const {success,token} = data
  const {user} = useSelector((state)=> state.fetch)


  const [clientReady, setClientReady] = useState(false);
  // To disable submit button at the beginning.

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = (values) => {
      dispatch(loginUser(values))
      if(success){
        localStorage.setItem("token",token)
      }
      dispatch(fetchUser())
      if(user.employee.dashboard){
        navigate(`/${user.employee.dashboard}-dashboard`)
      }
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
              block
              className="font-bold"
              htmlType="submit"
              shape="round"
              disabled={
                !clientReady ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
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
