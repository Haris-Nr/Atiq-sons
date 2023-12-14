import React, { useEffect, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input,message  } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, loginUser } from "../redux/Features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {

  // const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();
  
  // const navigate = useNavigate();
  
  const [form] = Form.useForm();
  // const {data} = useSelector((state) => state.auth);
  



  
  const [clientReady, setClientReady] = useState(false);
  // To disable submit button at the beginning.


  const onFinish = (values) => {

    dispatch(loginUser(values));
    // try {
    //   if(data.success){
    //     localStorage.setItem("token",data.token );
    //     // window.location.href="/dashboard"
    //   }
    // } catch (error) {
    //   console.log(error.message)

    // dispatch(loginUser(values));

    // if(data.success){
    //   navigate("/dashboard");
    // }
  

  };
  // useEffect(() => {
  //   dispatch(fetchUser());
  //   if (data) {
  //     messageApi.error('Login failed. Please check your credentials.')
  //   }
  //   if (data) {
  //     // messageApi.success(`${data.fullname} logged in successfully`)
  //     navigate("/dashboard");
  //   }
  //   // if (user) {
  //   //   navigate("/");
  //   // }
  
  // }, [navigate, dispatch,data,messageApi]);

  


  useEffect(() => {
    setClientReady(true);
      // if (localStorage.getItem("token")) {
      //   navigate("/dashboard");
      // }
  }, []);
  
  return (
    <div>
      {/* {contextHolder} */}
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
