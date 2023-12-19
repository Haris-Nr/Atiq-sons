import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import { Form, Input, InputNumber, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { PlusCircleOutlined   } from '@ant-design/icons';
import { useDispatch,useSelector } from "react-redux";
import { Productsbyemployee, addProduct } from "../../redux/Features/Product/productSlice";

const ProductButton = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.fetch);
  const { employee } = user;
  const { productdata } = useSelector((state)=>state.product)

  const onFinish = (values) => {
    console.log(values)
    values.createdBy = employee?._id
    dispatch(addProduct(values)).then(()=>{
      dispatch(Productsbyemployee(employee?._id))
    })
  };

  useEffect(() => {
    if (productdata.success) {
      message.success(productdata.message);
      resetFormAndCloseModal();
      setConfirmLoading(false);
    } else if (productdata.success === false) {
      message.error(productdata.message);
      setConfirmLoading(false);
    }
  }, [productdata,dispatch]);
  


  const validateImage = (_, file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage;
  };

  const showModal = () => {
    setOpen(true);
  };

  const formRef = useRef(null);

  const resetFormAndCloseModal = () => {
    formRef.current.resetFields();
    setOpen(false);
  };

  const handleOk = () => {
    formRef.current.submit();
  };

  const handleCancel = () => {
    resetFormAndCloseModal()
  };

  return (
    <>
      <div className=" relative w-full px-4 max-w-full flex-grow flex-1 text-right " >
       <Button
       onClick={showModal}
    className=" text-white group-hover:text-gray-900   bg-indigo-500 focus:bg-indigo-600 ..."
      shape="round"
      icon={<PlusCircleOutlined   />}
      size="medium"
     
    >
      Add Product
    </Button>
    </div>
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
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
          rules={[{ required: true, message: 'Please upload an image!' }]}
          >
            <Upload
              name="image"
              listType="picture-card"
              beforeUpload={validateImage}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
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
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
