import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
<<<<<<< HEAD
import { Button, Select, Form, Input } from "antd";
=======
import { Button, Select, Form, Input, message as messageApi } from "antd";
>>>>>>> 131a352 (bilal)
import { Link, useNavigate } from "react-router-dom";
// import PhoneInput from "antd-phone-input";
import PhoneInput from "react-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/Features/auth/authSlice";
import 'react-phone-number-input/style.css'
const Signup = () => {
    const dispatch = useDispatch();
<<<<<<< HEAD
    const navigate = useNavigate()
    const {data,isError,isSuccess,message} = useSelector((state) => state.auth);
=======
    const { data, isError, isSuccess, message } = useSelector((state) => state.auth);
>>>>>>> 131a352 (bilal)
    // console.log(data)
    // console.log(isError)
    // console.log(isSuccess)
    // console.log(message)
<<<<<<< HEAD
    
    const [form] = Form.useForm();
=======

    const [form] = Form.useForm();
    const navigate = useNavigate();


>>>>>>> 131a352 (bilal)

    const [clientReady, setClientReady] = useState(false);
    // To disable submit button at the beginning.
    useEffect(() => {
        setClientReady(true);
    }, []);

    const onFinish = (values) => {
        dispatch(signupUser(values));
<<<<<<< HEAD
        navigate('/');
    };

=======
        if (isSuccess) {
            messageApi.success("Signup successful!");
            navigate("/");
        } else if (isError) {
            messageApi.error("Signup failed. Please check your information.");
        }
    };


>>>>>>> 131a352 (bilal)
    const options = [
        {
            value: "Lahore",
            label: "Lahore",
        },
        {
            value: "Dubai",
            label: "Dubai",
        },
        {
            value: "China",
            label: "China",
        },
    ];

    return (
        <div className="-mb-7">
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
                    name="confirmpassword"
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
                    name="mobile"
                    message="Please inout your Phone NO"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}
<<<<<<< HEAD
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    hasFeedback
=======
                    hasFeedback
                    prefix={<LockOutlined className="site-form-item-icon" />}
>>>>>>> 131a352 (bilal)
                >
                    <PhoneInput
                        placeholder="Enter phone number"
                        className="phoneInput"
                    />
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
                        options={options}
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
