import { Button, Popconfirm, Space, Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  changeUserStatus,
  deleteEmployee,
  getEmployee,
} from "../../redux/Features/Employees/employeeSlice";
import moment from "moment";

function Empolyee() {
  const dispatch = useDispatch();

  const { getEmployeedata, isLoading, deleteEmployeedata, changeStatusdata } =
    useSelector((state) => state.employee);


  useEffect(() => {
    dispatch(getEmployee());
    // if (deleteEmployeedata.success === true) {
    //   message.success(deleteEmployeedata.message);
    // } else if (deleteEmployeedata.success === false) {
    //   message.error(deleteEmployeedata.message);
    // }
    // if (changeStatusdata.success === true) {
    //   message.success(changeStatusdata.message);
    // } else if (changeStatusdata.success === false) {
    //   message.error(changeStatusdata.message);
    // }
  }, [dispatch,deleteEmployeedata,changeStatusdata]);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id)).then(() => {
      // if (deleteEmployeedata.success === true) {
      //   message.success(deleteEmployeedata.message);
      // } else if (deleteEmployeedata.success === false) {
      //   message.error(deleteEmployeedata.message);
      // }
      dispatch(getEmployee());
    });
  };


  const handleStatus = (id, newStatus) => {
    dispatch(changeUserStatus({ id, newStatus })).then(() => {
      // if (changeStatusdata.success === true) {
      //   message.success(changeStatusdata.message);
      // } else if (changeStatusdata.success === false) {
      //   message.error(changeStatusdata.message);
      // }
      dispatch(getEmployee());
    });
  };

  const columns = [
    {
      title: "SrNo",
      key: "srNo",
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "FullName",
      dataIndex: "fullname",
      key: "fullname",
      className: 'text-md  tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 cursor-pointer',

    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Dashboard",
      dataIndex: "dashboard",
      key: "dashboard",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => {
        return record.role.toUpperCase();
      },
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "JOIN DATE",
      dataIndex: "createdAt",
      render: (data, record) => {
        return moment(record.createdAt).format("DD/MM/YYYY");
      },
      key: "createdAt",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <Space size="middle">
            <Popconfirm
              title="Are you sure to delete this employee?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button>Delete</Button>
            </Popconfirm>
            <Popconfirm
              title="Are you sure to change status this employee?"
              onConfirm={() =>
                handleStatus(
                  record._id,
                  `${record.status === "active" ? "blocked" : "active"}`
                )
              }
              okText="Yes"
              cancelText="No"
            >
              <Button>status</Button>
            </Popconfirm>
          </Space>
        );
      },
      key: "action",
    },
  ];

  const dataSourceWithKeys = getEmployeedata.data
    ? getEmployeedata.data.map((item) => ({
      ...item,
      key: item._id,
    }))
    : [];

  return (
    <div>
      <Typography.Title level={4}>Empolyee</Typography.Title>
      <Table
        bordered
        loading={isLoading}
        columns={columns}
        responsive="stack"
        dataSource={dataSourceWithKeys}
        pagination={{
          pageSize: 8,
        }}
        scroll={{
          x: 1500,
        }}
      />
    </div>
  );
}
export default Empolyee;
