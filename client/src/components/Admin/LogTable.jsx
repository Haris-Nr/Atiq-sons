import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import moment from "moment";
import { allLogs, setCurrentPage, setPageSize } from "../../redux/Features/auth/logSlice";

const LogTable = () => {
  const dispatch = useDispatch();
  const { allLogsData, totalItems, currentPage, pageSize } = useSelector((state) => state.log);

  useEffect(() => {
    dispatch(allLogs());
  }, [dispatch, currentPage, pageSize]);

  const handleTableChange = (pagination) => {
    dispatch(setCurrentPage(pagination.current));
    dispatch(setPageSize(pagination.pageSize));
  };

  const columns = [
    {
      title: "FullName",
      dataIndex: "fullname",
      key: "fullname",
      render: (text, record) => {
        return <>{record?.user_id?.fullname}</>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => {
        return <>{record?.user_id?.email}</>;
      },
    },
    {
      title: "Dashboard",
      dataIndex: "dashboard",
      key: "dashboard",
      render: (text, record) => {
        return <>{record?.user_id?.dashboard}</>;
      },
    },
    {
      title: "DATE",
      dataIndex: "createdAt",
      render: (text) => moment(text).format("DD/MM/YYYY"),
      key: "createdAt",
    },
    {
      title: "Login Time",
      dataIndex: "loginTime",
      render: (text) => moment(text).format("HH:mm:ss"),
      key: "loginTime",
    },
    {
      title: "Logout Time",
      dataIndex: "logoutTime",
      render: (text) => {
        return(
          text?
          moment(text).format("HH:mm:ss"):"00:00:00"
        );
      },
      key: "logoutTime",
    },
  ];

  const dataSourceWithKeys = allLogsData?.data
    ? allLogsData?.data.map((item) => ({ ...item, key: item._id }))
    : [];

  return (
    <div>
      <Table
        bordered
        columns={columns}
        dataSource={dataSourceWithKeys}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalItems,
          showTotal: (total) => `Total ${total} items`,
        }}
        onChange={handleTableChange}
        scroll={{ x: 1500 }}
      />
    </div>
  );
};

export default LogTable;
