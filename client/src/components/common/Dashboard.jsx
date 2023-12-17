import React from "react";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Space } from "antd";

import DashboardCard from './DashboardCard';


const  Dashboard = () => {

  return (
    <Space size={6} direction="vertical" className="">
      <Space direction="horizontal" className="flex">
        <div className="w-full  xl:w-[100%]"
          style={{
            padding: "0 10px 30px",
            background: "#504BE4"
          }}
        >
          <div className="flex  flex-col lg:flex-row items-center justify-between">
            <div className="w-full p-1 lg:ml-44 flex justify-between items-center">
              <div className="flex- text-white justify-between">

                  <h1 className="text-3xl font-bold mb-4">Good Morning, Victor!</h1>
                  <p>Here&lsquo;s what&lsquo;s happening with your store today</p>
                  <p className="text-lg font-semibold">TODAY&lsquo;S VISIT</p>
                  <p className="text-lg font-semibold">15,209</p>

                <div className="md:flex gap-3">
                  <div className="flex text-center justify-center gap-3">
                    <DashboardCard
                      icon={
                        <ShoppingCartOutlined
                          className="text-xl p-2 lg:text-3xl lg:p-4"
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
                          className="text-xl p-2 lg:text-3xl lg:p-4"
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
                  <div className="flex justify-center  gap-3">
                    <DashboardCard
                      icon={
                        <UserOutlined
                          className="text-xl p-2 lg:text-3xl lg:p-4"
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
                        className="text-xl p-2 lg:text-3xl lg:p-4"
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
            </div>

            {/* Add your image here */}
            <div className="w-full overflow-hidden">
              <img
                src="/welcome.png"
                alt="wekcome.jpg"
                className="w-full  h-full object-cover block"
              />
            </div>
          </div>
        </div>
      </Space>
    </Space>

  );
}

export default Dashboard;
