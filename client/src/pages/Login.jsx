import React, { useEffect, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, resetLoginState} from "../redux/Features/auth/authSlice";
import { fetchUser } from "../redux/Features/auth/fetchSlice";

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loginData} = useSelector((state)=> state.auth)
  const {user} = useSelector((state)=> state.fetch)


  const [clientReady, setClientReady] = useState(false);



  useEffect(() => {
    setClientReady(true);
    const token = sessionStorage.getItem("token");
    if (token) {
      if (user?.employee?.dashboard) {
        navigate(`/${user?.employee?.dashboard}dashboard`);
      }
    } else {
      navigate("/");
    }
  }, [navigate,user]);


  const onFinish =(values) => {
    dispatch(loginUser(values));
  };
  

  useEffect(() => {    
    try {
        if (loginData.success === true) {
          sessionStorage.setItem("token",loginData.token)
            dispatch(fetchUser())
            message.success(loginData.message);
            dispatch(resetLoginState())
            if (user?.employee?.dashboard) {
              navigate(`/${user?.employee?.dashboard}dashboard`);
            }
        } else if(loginData.success === false) {
          message.error(loginData.message);
        dispatch(resetLoginState())
        }
    } catch (error) {
      message.error(error);
    }
}, [dispatch,navigate,loginData,user])



  
  
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
          <Link className="login-form-forgot" to="resetpassword">
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
