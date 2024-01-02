import React, { useEffect } from "react";
import { Badge, Descriptions, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changeUserStatus, deleteEmployee, getEmployeeDetails, resetDeleteState, resetStatusState } from "../../redux/Features/Employees/employeeSlice";
import { useParams } from "react-router-dom";
import moment from "moment";
import ChangeStatusButton from "../common/ChangeStatusButton";
import DeleteButton from "../common/DeleteButton";

const UserInfo = () => {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getEmployeeDetails(id));
    }
  }, [dispatch, id]);
  const { employeeDetails, deleteEmployeedata, changeStatusdata } = useSelector((state) => state.employee);
  const employee = employeeDetails?.employee;
  const log = employeeDetails.logs;

  const handleStatus = (id, newStatus) => {
    dispatch(changeUserStatus({ id, newStatus })).then(() => {
      dispatch(getEmployeeDetails(id));
    });
  };

  useEffect(() => {
    if (changeStatusdata.success === true) {
      message.success(changeStatusdata.message);
      dispatch(resetStatusState());
    } else if (changeStatusdata.success === false) {
      message.error(changeStatusdata.message);
      dispatch(resetStatusState());
    }
  }, [changeStatusdata, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id)).then(() => {
      dispatch(getEmployeeDetails(id));
    });
  };

  useEffect(() => {
    if (deleteEmployeedata.success === true) {
      message.success(deleteEmployeedata.message);
      dispatch(resetDeleteState());
    } else if (deleteEmployeedata.success === false) {
      message.error(deleteEmployeedata.message);
      dispatch(resetDeleteState());
    }
  }, [deleteEmployeedata, dispatch]);

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
          <ChangeStatusButton
              itemType="employee"
              Id={id}
              currentStatus={employee?.status}
              onChangeStatus={handleStatus}
            />
            <DeleteButton onConfirmDelete={() => handleDelete(id)} />
        </>
      }
    />
  );
};
export default UserInfo;
