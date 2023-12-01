import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getOrders, getProduct } from "..";
import AddProduct from "../Lahore/AddProduct";
import TaskButton from "../Admin/TaskButton";


function DashboardCard({ icon, title, value }) {
  return (
    <Card className="relative flex flex-col mb-4 text-gray-700 bg-white shadow-md w-82 rounded-xl bg-clip-border">
      <Space direction="horizontal" className="items-center ">
        {icon}
        <Typography.Text className="mb-2 ml-2 font-sans text-xl font-semibold tracking-normal text-blue-gray-900">{title}</Typography.Text>
        <Typography.Text className="mb-2 ml-2 font-semibold text-blue-gray-900">{value}</Typography.Text>
      </Space>
    </Card>
  );
}

const  Dashboard = () => {
  const [orders, setOrders] = useState(0);
  const [product, setProduct] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total);
      setRevenue(res.discountedTotal);
    });
    getProduct().then((res) => {
      setProduct(res.total);
    });
    getCustomers().then((res) => {
      setCustomers(res.total);
    });
  }, []);

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
        value={orders}
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
        value={product}
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
        value={customers}
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
        value={revenue}
      />
    <AddProduct/>
    <TaskButton/>
      {/* <img src={bulb} alt="" /> */}
    </Space>
  </Space>
  
  );
}

export default Dashboard;
