import React, { useEffect, useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import { Link } from "react-router-dom";
import CustomInput from "../components/Forms/CustomInput";

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
            <Form
                form={form}
                name="forgetPassword"
                onFinish={onFinish}
            >
                <CustomInput
                    name="email"
                    placeholder="Enter Your Email"
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    type="email"
                    required="true"
                    message="Please input your Email"
                    className="sm:text-lg"
                />

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
