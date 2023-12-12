import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Space, Typography } from "antd";
import { useEffect} from "react";
import AddProduct from "../Lahore/ProductButton";
import TaskButton from "../Admin/TaskButton";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/Features/auth/authSlice";
import DashboardCard from './DashboardCard';
import { useNavigate } from "react-router-dom";

const  Dashboard = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  // const {data,isError,isSuccess,message} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Space size={6} direction="vertical" className="p-6">
    <Typography.Title level={4} className="mb-4">
      Dashboard
    </Typography.Title>
    <Space direction="horizontal" className="flex flex-wrap gap-12 ">
      <DashboardCard
        icon={
          <ShoppingCartOutlined
            style={{
              color: "green",
              backgroundColor: "rgba(0,255,0,0.25)",
              borderRadius: 20,
              fontSize: 24,
              padding: 10,
            }}
          />
        }
        title="Tasks"
        // value={}
      />
      <DashboardCard
        icon={
          <ShoppingOutlined
            style={{
              color: "blue",
              backgroundColor: "rgba(0,0,255,0.25)",
              borderRadius: 20,
              fontSize: 24,
              padding: 10,
            }}
          />
        }
        title={"Product"}
        // value={}
      />
      <DashboardCard
        icon={
          <UserOutlined
            style={{
              color: "purple",
              backgroundColor: "rgba(0,255,255,0.25)",
              borderRadius: 20,
              fontSize: 24,
              padding: 10,
            }}
          />
        }
        title={"Employee"}
        // value={}
      />
      <DashboardCard
        icon={
          <DollarCircleOutlined
            style={{
              color: "red",
              backgroundColor: "rgba(255,0,0,0.25)",
              borderRadius: 20,
              fontSize: 24,
              padding: 10,
            }}
          />
        }
        title={"Revenue"}
        // value={}
      />
    <AddProduct/>
    <TaskButton/>
    <Button
    onClick={()=> {
      localStorage.removeItem("token")
      navigate("/");}}
    >
      logout
    </Button>
      {/* <img src={bulb} alt="" /> */}
    </Space>
  </Space>
  
  );
}

export default Dashboard;
