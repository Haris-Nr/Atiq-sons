import {
  Button,
  Popconfirm,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  changeUserStatus,
  deleteEmployee,
  getEmployee,
  resetDeleteState,
  resetStatusState,
} from "../../redux/Features/Employees/employeeSlice";
import moment from "moment";
import EmployeeButton from "./EmployeeButton";
import Highlighter from "react-highlight-words";
import Search from "antd/es/input/Search";

function Empolyee() {

  const dispatch = useDispatch();

  const { getEmployeedata, isLoading, deleteEmployeedata, changeStatusdata } =
    useSelector((state) => state.employee);

    const [searchText, setSearchText] = useState("");
    const searchInput = useRef(null);

    const handleSearch = (value) => {
      setSearchText(value);
    };

    const renderColumnWithHighlight = (text) => (
      <Highlighter
        highlightStyle={{
          backgroundColor: "yellow",
          padding: 0,
        }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ""}
      />
    );

  useEffect(() => {
    dispatch(getEmployee());
  }, [dispatch]);

  useEffect(() => {
    if (changeStatusdata.success === true) {
      message.success(changeStatusdata.message);
      dispatch(resetStatusState());
    } else if (changeStatusdata.success === false) {
      message.error(changeStatusdata.message);
      dispatch(resetStatusState());
    }
  }, [changeStatusdata, dispatch]);

  useEffect(() => {
    if (deleteEmployeedata.success === true) {
      message.success(deleteEmployeedata.message);
      dispatch(resetDeleteState())
    } else if (deleteEmployeedata.success === false) {
      message.error(deleteEmployeedata.message);
      dispatch(resetDeleteState())
    }
  }, [deleteEmployeedata,dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id)).then(() => {
      dispatch(getEmployee());
    });
  };

  const handleStatus = (id, newStatus) => {
    dispatch(changeUserStatus({ id, newStatus })).then(() => {
      dispatch(getEmployee());
    });
  };

  const columns = [
    {
      title: "SrNo",
      key: "srNo",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "FullName",
      dataIndex: "fullname",
      key: "fullname",
      render: (text) => {
        return (
          <>
            {renderColumnWithHighlight(text)}
          </>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key:"email",
      render: (text) => {
        return (
          <>
            {renderColumnWithHighlight(text)}
          </>
        );
      },
    },
    {
      title: "Phone",
      dataIndex: "mobile",
      key:"mobile",
      render: (text) => {
        return (
          <>
            {renderColumnWithHighlight(text)}
          </>
        );
      },
    },
    {
      title: "Dashboard",
      dataIndex: "dashboard",
      key: "dashboard",
      render: (text) => {
        return (
          <>
            {renderColumnWithHighlight(text)}
          </>
        );
      },
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
      render: (text, { status }) => {
        return (
          <Tag color={`${status === "blocked" ? "red" : "green"}`} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
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
              title={`Are you sure to ${
                record.status === "active" ? "blocked" : "active"
              }  this employee?`}
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
    ? getEmployeedata.data
    .filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase())
    )
    .map((item) => ({
      ...item,
      key: item._id,
    }))
: [];

  const heading = (
    <div className="flex justify-between"> 
       <Search
        ref={searchInput}
        size="medium"
        style={{ marginBottom: 2, width: "30%" }}
        onSearch={handleSearch}
        placeholder="Search"
        allowClear
      />
      <EmployeeButton />
    </div>
  );

  return (
    <div>
      <Table
        title={() => heading}
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
