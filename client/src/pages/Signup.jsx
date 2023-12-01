import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Select, Form, Input } from "antd";
import { Link } from "react-router-dom";
import PhoneInput from "antd-phone-input";
import { Option } from "antd/es/mentions";

const Signup = () => {
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
        <div className="lg:-mb-7">
            <h3 className="text-blue-800 font-bold text-lg pb-5 lg:pb-2">Sign Up</h3>
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
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("The new password that you entered do not match!")
                                );
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        placeholder="Enter Your Confirm Password"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        className="sm:text-lg"
                    />
                </Form.Item>
                <Form.Item
                    name="phoneNo"
                    message="Please inout your Phone NO"
                    required="true"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    hasFeedback
                >
                    <PhoneInput
                        international
                        defaultCountry="pk"
                        placeholder="Enter phone number"
                    />
                </Form.Item>
                <Form.Item
                    name="category"
                    required="true"
                    message="Please select a Dashboard"
                    hasFeedback
                >
                    <Select placeholder="Select a Dashboard" size="large">
                        <Option value="Lahore">Lahore</Option>
                        <Option value="Dubai">Dubai</Option>
                        <Option value="China">China</Option>
                    </Select>
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
                            Sign Up
                        </Button>
                    )}
                </Form.Item>
                <Form.Item className="lg:-mt-3">
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
