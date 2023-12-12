import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import ProductForm from './ProductForm';

const AddProduct = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState('Content of the modal');
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
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
      <ProductForm />
    </Modal>
  </>
  )
}

export default AddProduct