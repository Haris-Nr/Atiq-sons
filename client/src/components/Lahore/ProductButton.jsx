import React, { useRef, useState } from 'react'
import { Button, Modal } from 'antd';
import ProductForm from './ProductForm';

const AddProduct = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  
  const showModal = () => {
    setOpen(true);
  };

  const formRef = useRef(null);
  const handleOk = () => {
    formRef.current.submit();
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setOpen(false);
  };


  return (
    <>
<<<<<<< HEAD
    <Button onClick={showModal}>
      Add Product
=======
    <Button onClick={showModal}size="large"
        className="font-bold border-none bg-green-500 hover:bg-black">
      Add New Product
>>>>>>> 131a352 (bilal)
    </Button>
    <Modal
      title="Add Product"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
    <ProductForm ref={formRef} /> 
    </Modal>
  </>
  )
}

export default AddProduct