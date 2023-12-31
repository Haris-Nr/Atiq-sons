import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Select, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useSelector, useDispatch } from "react-redux";
import { resetSignupState, signupUser } from "../redux/Features/auth/authSlice";

const Signup = () => {
  const [clientReady, setClientReady] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupData } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    dispatch(signupUser(values));
  };

  useEffect(() => {
    try {
      if (signupData.success === true) {
        navigate("/");
        message.success(signupData.message);
        dispatch(resetSignupState());
      } else if (signupData.success === false) {
        message.error(signupData.message);
        dispatch(resetSignupState());
      }
    } catch (error) {
      message.error(error);
    }
  }, [dispatch, navigate, signupData]);

  useEffect(() => {
    setClientReady(true);
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const dashboard = [
    {
      value: "lahore",
      label: "Lahore",
    },
    {
      value: "dubai",
      label: "Dubai",
    },
    {
      value: "china",
      label: "China",
    },
  ];

  return (
    <div>
      <h3 className="text-blue-800 font-bold text-lg ">Sign Up</h3>
      <Form
        form={form}
        name="signupForm"
        onFinish={onFinish}
        size="large"
        layout="vertical"
      >
        <Form.Item
          name="fullname"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter your full name!",
            },
            {
              type: "text",
              message: "Enter a valid email!",
            },
            { whitespace: true },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Enter your Full Name"
            className="text-lg"
          />
        </Form.Item>

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
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="Enter Your Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            className="sm:text-lg"
          />
        </Form.Item>

        <Form.Item
          name="mobile"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
          prefix={<LockOutlined className="site-form-item-icon" />}
          hasFeedback
        >
          <PhoneInput placeholder="Enter phone number +92..." />
        </Form.Item>
        <Form.Item
          name="dashboard"
          required="true"
          message="Please select a Dashboard"
          hasFeedback
        >
          <Select
            placeholder="Select a Dashboard"
            size="large"
            options={dashboard}
          />
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
              Sign Up
            </Button>
          )}
        </Form.Item>
        <Form.Item>
          Already have an account?&nbsp;
          <Link to="/" className="text-blue-400 underline">
            Login
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
