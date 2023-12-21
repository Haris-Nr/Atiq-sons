import { Table, Typography, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import { allLogs } from "../../redux/Features/auth/logSlice";

const LogTable = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.log);
console.log(state.allLogsData)
  useEffect(() => {
    dispatch(allLogs());
  }, [dispatch]);

  const columns = [
    { title: "FullName", dataIndex: "fullname", key: "fullname" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Dashboard", dataIndex: "dashboard", key: "dashboard" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Action", dataIndex: "action", key: "action" },
    {
      title: "DATE",
      dataIndex: "createdAt",
      render: (text) => moment(text).format("DD/MM/YYYY"),
      key: "createdAt",
    },
    { title: "Login Time", dataIndex: "createdAt", 
    render: (text) => moment(text).format("HH:mm:ss"),
    
    key: "loginTime" },
    { title: "Logout Time", dataIndex: "",
    render: (text) => moment(text).format("HH:mm:ss"),
    key: "logoutTime" }, // Assuming updatedAt is the logout time
  ];

  const dataSourceWithKeys = state.allLogsData?.data
    ? state.allLogsData.data.map((item) => ({ ...item.user_id, key: item._id }))
    : [];
  return (
    <div>
      <Typography.Title level={4}>Logs</Typography.Title>
      {state.isLoading ? (
        <Spin size="large" />
      ) : (
        <Table
          bordered
          columns={columns}
          dataSource={dataSourceWithKeys}
          pagination={{ pageSize: 8 }}
          scroll={{ x: 1500 }}
        />
      )}
    </div>
  );
};

export default LogTable;
