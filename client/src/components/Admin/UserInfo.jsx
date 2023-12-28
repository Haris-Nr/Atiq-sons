import React, { useEffect } from "react";
import { Badge, Button, Descriptions } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeDetails } from "../../redux/Features/Employees/employeeSlice";
import { useParams } from "react-router-dom";
import moment from "moment";

const UserInfo = () => {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getEmployeeDetails(id));
    }
  }, [dispatch, id]);
  const { employeeDetails } = useSelector((state) => state.employee);
  const employee = employeeDetails?.employee;
  const log = employeeDetails.logs;

  const handleButtonClick = (buttonType) => {
    console.log(`Button clicked: ${buttonType}`);
    // Add your button click handling logic here
  };

  const items = [
    {
      key: "1",
      label: "Full Name",
      children: employee?.fullname,
    },
    {
      key: "2",
      label: "Email",
      children: employee?.email,
    },
    {
      key: "3",
      label: "Mobile",
      children: employee?.mobile,
    },
    {
      key: "4",
      label: "Dashboard",
      children: employee?.dashboard,
    },
    {
      key: "5",
      label: "Role",
      children: employee?.role,
    },
    {
      key: "6",
      label: "Status",
      children: (
        <Badge
          status={employee?.status === "active" ? "purple" : "default"}
          text={employee?.status}
        />
      ),
    },
    {
      key: "7",
      label: "Created At",
      children: moment(employee?.createdAt).format("DD/MM/YYYY"),
    },
    {
      key: "8",
      label: "Action",
      children: (
        <Badge
          status={log?.action === "Login" ? "success" : "error"}
          text={log?.action}
        />
      ),
    },
    {
      key: "9",
      label: "LogStatus At",
      children: (
        <Badge
          status={log?.logStatus === "Active" ? "processing" : "error"}
          text={log?.logStatus}
        />
      ),
    },
  ];

  return (
    <Descriptions
      title="User Info"
      bordered
      items={items}
      extra={
        <>
          <Button type="primary" onClick={() => handleButtonClick("Edit")}>
            Edit
          </Button>
          <Button type="default" onClick={() => handleButtonClick("Delete")}>
            Delete
          </Button>
          <Button type="dashed" onClick={() => handleButtonClick("Refresh")}>
            Refresh
          </Button>
        </>
      }
    />
  );
};
export default UserInfo;
