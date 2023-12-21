import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Input, Modal, Select, message } from "antd";
import {
  PlusCircleOutlined,
  LockOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  resetSignupState,
  signupUser,
} from "../../redux/Features/auth/authSlice";
import PhoneInput from "react-phone-number-input";
import { getEmployee } from "../../redux/Features/Employees/employeeSlice";

const EmployeeButton = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { signupData } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    dispatch(signupUser(values)).then(() => {
      dispatch(getEmployee());
    });
  };

  useEffect(() => {
    try {
      if (signupData.success === true) {
        message.success(signupData.message);
        resetFormAndCloseModal();
        dispatch(resetSignupState());
      } else if (signupData.success === false) {
        message.error(signupData.message);
        dispatch(resetSignupState());
      }
    } catch (error) {
      message.error(error);
    }
  }, [dispatch, signupData]);

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
  const role = [
    {
      value: "admin",
      label: "Admin",
    },
    {
      value: "employee",
      label: "Employee",
    },
  ];

  const showModal = () => {
    setOpen(true);
  };

  const formRef = useRef(null);

  const resetFormAndCloseModal = () => {
    formRef.current.resetFields()
    setOpen(false);
  };

  const handleOk = () => {
    formRef.current.submit();
   
  };
  const handleCancel = () => {
    resetFormAndCloseModal();
  };
  return (
    <>
    
        <Button
          type="primary"
          onClick={showModal}
          shape="round"
          icon={<PlusCircleOutlined />}
        >
          Add New Employee
        </Button>
     
      <Modal
        title="Add New Employee"
        open={open}
        onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="signupForm"
          onFinish={onFinish}
          size="large"
          layout="vertical"
          ref={formRef}
        >
          <Form.Item
            name="fullname"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Enter employee full name!",
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
              placeholder="Enter employee full name!"
              className="text-lg"
            />
          </Form.Item>

          <Form.Item
            name="email"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Enter employee email!",
              },
              {
                type: "email",
                message: "Enter a valid email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Enter employee email!"
              className="text-lg"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Enter password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Enter Password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              className="sm:text-lg"
            />
          </Form.Item>

          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: "Enter employee phone number!",
              },
            ]}
            prefix={<LockOutlined className="site-form-item-icon" />}
            hasFeedback
          >
            <PhoneInput placeholder="Enter phone number +92....." />
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

          <Form.Item
            name="role"
            required="true"
            message="Please select a role"
            hasFeedback
          >
            <Select placeholder="Select a role" size="large" options={role} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EmployeeButton;
