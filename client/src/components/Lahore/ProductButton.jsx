import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
  Modal,
  Select,
} from "antd";
import { UploadOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  Productsbyemployee,
  addProduct,
  resetProductState,
} from "../../redux/Features/Product/productSlice";
import { Option } from "antd/es/mentions";
import { FetchNotifications } from "../../redux/Features/Notification/notificationSlice";

const ProductButton = () => {
  const [fileList, setFileList] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.fetch);
  const { employee } = user;
  const { productdata, isLoading } = useSelector((state) => state.product);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("createdBy", employee?._id);
    formData.append("seller", employee?.fullname);

    for (const [key, value] of Object.entries(values)) {
      if (key !== "image") {
        formData.append(key, value);
      }
    }

    if (fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
    }

    dispatch(addProduct(formData)).then(() => {
      dispatch(Productsbyemployee(employee?._id));
      dispatch(FetchNotifications());
    });
  };

  useEffect(() => {
    if (productdata.success) {
      message.success(productdata.message);
      resetFormAndCloseModal();
      setConfirmLoading(false);
      dispatch(resetProductState());
    } else if (productdata.success === false) {
      message.error(productdata.message);
      setConfirmLoading(false);
    }
  }, [productdata, dispatch]);

  const showModal = () => {
    setOpen(true);
  };

  const formRef = useRef(null);

  const resetFormAndCloseModal = () => {
    formRef?.current?.resetFields();
    setFileList([]);
    setOpen(false);
  };

  const handleOk = () => {
    formRef.current
      .validateFields()
      .then(() => {
        formRef.current.submit();
        setConfirmLoading(true);
        if (isLoading) {
          resetFormAndCloseModal();
          setConfirmLoading(false);
        }
      })
      .catch((errorInfo) => {
        message.error(errorInfo);
      });
      dispatch(Productsbyemployee(employee?._id));
  };

  const handleCancel = () => {
    resetFormAndCloseModal();
  };

  const selectAfter = (
    <Select
      defaultValue="USD"
      style={{
        width: 60,
      }}
    >
      <Option value="USD">$</Option>
      <Option value="EUR">€</Option>
      <Option value="GBP">£</Option>
      <Option value="CNY">¥</Option>
      <Option value="AED">AED</Option>
    </Select>
  );

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        shape="round"
        icon={<PlusCircleOutlined />}
      >
        Add New Product
      </Button>

      <Modal
        title="Add Product"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          name="addProductForm"
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          ref={formRef}
        >
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[
              {
                required: true,
                message: "Please enter Product Name!",
              },
              {
                type: "text",
                message: "Enter a Valid Product Name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              { required: true, message: "Please enter the quantity!" },
              {
                type: "number",
                min: 0,
                message: "quantity must be a non-negative number!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Image Upload"
            name="image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload
              maxCount={1}
              fileList={fileList}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="ASIN"
            name="asin"
            rules={[
              {
                required: true,
                message: "Please enter ASIN number!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please enter the price!" },
              {
                type: "number",
                min: 0,
                message: "Price must be a non-negative number!",
              },
            ]}
          >
            <InputNumber
              addonAfter={selectAfter}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            rules={[
              { required: true, message: "Please enter the Rating" },
              {
                type: "number",
                min: 0,
                message: "Rating must be a non-negative number!",
              },
              {
                type: "number",
                max: 5,
                message: "Rating must be a less than or equal to 5 number!",
              },
            ]}
          >
            <InputNumber
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="URL Link"
            name="url"
            rules={[
              { required: true, message: "Please input the URL link!" },
              { type: "url", message: "Please enter a valid URL!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select the category!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductButton;
