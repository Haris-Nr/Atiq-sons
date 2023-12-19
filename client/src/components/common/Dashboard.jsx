import React from "react";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import DashboardCard from "./DashboardCard";
import { useSelector } from "react-redux";


const Dashboard = () => {
  const { user } = useSelector((state) => state.fetch);
  const { employee } = user;
  return (
    <>
      <div
        className="flex-col"
        style={{
          background: "#504BE4",
        }}
      >
        <div className="xl:flex xl:justify-between">
          <div className="p-5 flex-col text-white text-start">
            <h1 className="text-3xl font-bold mb-4">
              Good Morning,
              {employee?.fullname.charAt(0).toUpperCase() +
                employee?.fullname.slice(1)}
            </h1>
            <div className="md:flex gap-3">
              <div className="flex text-center justify-center gap-3">
                <DashboardCard
                  icon={
                    <ShoppingCartOutlined
                      className="text-sm md:text-2xl lg:p-4"
                      style={{
                        color: "green",
                        backgroundColor: "#F8F8FB",
                        borderRadius: 40,
                      }}
                    />
                  }
                  title="Tasks"
                />
                <DashboardCard
                  icon={
                    <ShoppingOutlined
                      className="text-sm md:text-2xl lg:p-4"
                      style={{
                        color: "blue",
                        backgroundColor: "#F8F8FB",
                        borderRadius: 40,
                      }}
                    />
                  }
                  title={"Product"}
                />
              </div>
              <div className="flex justify-center gap-3">
                <DashboardCard
                  icon={
                    <UserOutlined
                      className="text-sm  md:text-2xl lg:p-4"
                      style={{
                        color: "purple",
                        backgroundColor: "#F8F8FB",
                        borderRadius: 40,
                      }}
                    />
                  }
                  title={"Employee"}
                />
                <DashboardCard
                  icon={
                    <DollarCircleOutlined
                      className="text-sm  md:text-2xl lg:p-4"
                      style={{
                        color: "red",
                        backgroundColor: "#F8F8FB",
                        borderRadius: 40,
                      }}
                    />
                  }
                  title={"Revenue"}
                />
              </div>
            </div>
          </div>
          <div>
            <img src="/welcome.png" alt="wekcome.jpg" className="mx-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
