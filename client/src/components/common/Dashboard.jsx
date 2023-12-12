import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
<<<<<<< HEAD
import { Button, Space, Typography } from "antd";
import { useEffect} from "react";
import AddProduct from "../Lahore/ProductButton";
import TaskButton from "../Admin/TaskButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/Features/auth/authSlice";
import DashboardCard from './DashboardCard';
import { useNavigate } from "react-router-dom";

const  Dashboard = () => {

  const navigate = useNavigate();
=======
import { Space, Typography, Row, Col, } from "antd";
import { useEffect, useState } from "react";
import Product from "./ProductTable";
import Task from "./TaskTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/Features/auth/authSlice";
import DashboardCard from './DashboardCard';

const  Dashboard = () => {
    const [currentTime, setCurrentTime] = useState(new Date().getHours());
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date().getHours());
      }, 60000);
      return () => clearInterval(intervalId);
    }, []);
    const greeting = (
      currentTime < 12 ? "Good Morning" :
      currentTime < 18 ? "Good Afternoon" :
      "Good Evening"
    );

>>>>>>> 131a352 (bilal)

  const dispatch = useDispatch();
  const {data,isError,isSuccess,message} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
<<<<<<< HEAD
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
  
=======
    <>
    <Space size={6} direction="vertical" className="md:p-6">
      <Typography.Title level={4} className="mb-4">
        Dashboard
      </Typography.Title>
      <Row gutter={16}>
        <Col span={12} xs={24} lg={12}>
          <Row>
          <div className="w-full bg-blue-300 rounded-lg p-7 lg:items-center shadow-2xl xl:w-[100%]">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 text-center">
          <h1 className="text-xl md:text-xl lg:text-2xl xl:text-3xl">{greeting}, {data.fullname}</h1>
                 <p className="text-sm md:text-base lg:text-lg xl:text-xl">TODAY’S VISIT</p>
                <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">15,209</h1>
                {/* <p className="text-sm md:text-base lg:text-lg xl:text-xl">TODAY’S TOTAL SALES</p> */}
                {/* <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">$29,115.50</h1> */}
          </div>
          
          <div className="w-full lg:w-1/2 bg-blue-300 rounded-tr-lg rounded-br-lg overflow-hidden">
          <img
                  src="/shop.png"
                  alt="Description of the image"
                  className="w-full h-full object-cover block"

                />
            
          </div>
        </div>
      </div>
          </Row>
        </Col>
        <Col span={12} xs={24} lg={12}>
       
          <Space size={[2, 4, 6]} direction="vertical" className="p-4 gap-12 md:p-6 lg:p-8">
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
              // value={orders}
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
              // value={customers}
            />
          </Space>
          <Space size={[2, 4, 6]} direction="vertical" className="p-4 gap-12 md:p-6 lg:p-8">
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
              // value={product}
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
              // value={revenue}
            />
            {/* <img src={bulb} alt="" /> */}
          </Space>
        </Col>
      </Row>
    </Space>
    <Row gutter={16}>
        <Col span={12} xs={24} lg={12}>
      <Product/>
      </Col>
      <Col span={12} xs={24} lg={12}>
      <Task/>
      </Col>
      </Row>
      </>
>>>>>>> 131a352 (bilal)
  );
}

export default Dashboard;
