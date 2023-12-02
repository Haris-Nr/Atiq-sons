import React, { useEffect, useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
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
            <h3 className="text-blue-800 font-bold text-lg  pb-5">Forget Password</h3>
            <Form form={form} name="forgetPassword" onFinish={onFinish} size="large" layout="vertical">
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
                <Form.Item shouldUpdate>
                    {() => (
                        <Link to="/resetpassword">
                            <Button 
                                block
                                className="font-bold "
                                htmlType="submit"
                                shape="round"
                                disabled={
                                    !clientReady ||
                                    !form.isFieldsTouched(true) ||
                                    !!form.getFieldsError().filter(({ errors }) => errors.length)
                                        .length
                                }
                            >
                                Forget Password
                            </Button>
                        </Link>
                    )}
                </Form.Item>
            </Form>
        </div>
    );
};

export default ForgetPassword;
