import React, { useState } from 'react'
import { Button, Modal } from 'antd';

const EmployeeButton = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
      setOpen(true);
    };
    const handleOk = () => {
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
    <Button onClick={showModal} size="large"
        className="font-bold border-none bg-green-500 hover:bg-black">
    Add New Employee 
    </Button>
    <Modal
      title="Add New Employee"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
    </Modal>
    </>
  )
}

export default EmployeeButton;