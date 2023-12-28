import React, { useEffect, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordState,
  resetUserPassword,
} from "../redux/Features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resetData } = useSelector((state) => state.auth);

  useEffect(() => {
    setClientReady(true);
  }, []);

  useEffect(() => {
    if (resetData && resetData.message) {
      if (resetData.success) {
        message.success(resetData.message);
        navigate("/");
        dispatch(resetPasswordState());
      } else {
        message.error(resetData.message);
      }
    }
  }, [resetData, navigate, dispatch]);

  const onFinish = async (values) => {
    dispatch(resetUserPassword(values));
  };

  return (
    <div>
      <h3 className="text-blue-800 font-bold text-lg  pb-5">Reset Password</h3>
      <Form
        form={form}
        name="resetPassword"
        onFinish={onFinish}
        size="large"
        layout="vertical"
      >
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
            className="sm:text-lg"
          />
        </Form.Item>
        <Form.Item
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter Your Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            className="sm:text-lg"
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
              Reset Password
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
