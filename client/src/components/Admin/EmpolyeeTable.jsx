<<<<<<< HEAD
import { Avatar, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers } from "..";
import { Link } from "react-router-dom";

function Empolyee() {


  useEffect(() => {

  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "image",
      render: (link) => {
        return <Avatar   src={link}  />;
      },
    },
    {
      title: "Name",
      dataIndex: "firstName",
    },
    {
      title: "Dashboard",
      dataIndex: "lastName",
=======
import React, { useEffect } from "react";
import { Button, Space, Table, Typography, Tag, message as messageApi } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee, deleteEmployee } from "../../redux/Features/Employees/employeeSlice";
import EmployeeButton from "./EmployeeButton";

const Employee = () => {
  const dispatch = useDispatch();

  const handleDeleteEmployee = (id) => {
    // e.preventDefault();
    dispatch(deleteEmployee(id));
  };

  useEffect(() => {
    dispatch(getEmployee());
  }, [dispatch]);

  const { employees } = useSelector((state) => state.employees);
  const data = employees;





  const columns = [
    {
      title: "Name",
      dataIndex: "fullname",
      key: "fullname",
      className: "bg-purple-50",
>>>>>>> 131a352 (bilal)
    },
    {
      title: "Email",
      dataIndex: "email",
<<<<<<< HEAD
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },

    {
      title: "address",
      dataIndex: "address",
      render: (address) => {
        return (
          <span className="">
            {address.address}, {address.city}
          </span>
        );
      },
    },
    {
      title:"Status",
      dataSource: "status",
=======
      key: "email",
      className: "bg-purple-50",
    },
    {
      title: "Phone",
      dataIndex: "mobile",
      key: "mobile",
      className: "bg-purple-50",
    },
    {
      title: "Dashboard",
      dataIndex: "dashboard",
      key: "dashboard",
      className: "bg-purple-50",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      className: "bg-purple-50",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className:"bg-purple-50",
      render: (_, { status }) => (
        <>
         <Tag color="purple">
                {status.toUpperCase()}
          </Tag>
        </>
      ),
>>>>>>> 131a352 (bilal)
    },
    {
      title: "Action",
      dataIndex: "action",
<<<<<<< HEAD
      render: () => {
        return (
          <Space size="middle">
            <Link>Edit</Link>
          </Space>
        );
      },
    }
  ]
  return (
    <div>
      <Typography.Title level={4}>Empolyee</Typography.Title>
      <Table
        columns={columns}
        responsive="stack"
        // dataSource={}
=======
      key: "action",
      className:"bg-purple-50",
      render: (_, record) => (
        console.log(record),
        <Space size="middle">
          <Button
            size="large"
            className="font-bold border-none bg-blue-500 hover:bg-black"
          >
            Edit
          </Button>
          <Button
            size="large"
            className="font-bold border-none bg-red-500 hover:bg-black"
            onClick={() => handleDeleteEmployee(record._id)
              .then(() => messageApi.success(`employee deleted successfully`))
              .catch((error) => messageApi.error('Deletion failed:', error))}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="bg-white flex items-center justify-between">
        <Typography.Title level={4}>Employees</Typography.Title>
        <EmployeeButton />
      </div>
      <Table
        columns={columns}
        responsive="stack"
        dataSource={data}
>>>>>>> 131a352 (bilal)
        pagination={{
          pageSize: 8,
        }}
        scroll={{
          x: 1500,
        }}
      />
    </div>
  );
<<<<<<< HEAD
}
export default Empolyee;
=======
};

export default Employee;
>>>>>>> 131a352 (bilal)
