import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Space, Typography } from "antd";
import { useEffect } from "react";
import AddProduct from "../Lahore/ProductButton";
import TaskButton from "../Admin/TaskButton";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/Features/auth/authSlice";
import DashboardCard from './DashboardCard';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  // const {data,isError,isSuccess,message} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

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
                {/* <div className="text-white"> */}
                  <h1 class="text-3xl font-bold mb-4">Good Morning, Victor!</h1>
                  <p class="">Here’s what's happening with your store today</p>
                  <p class="text-lg font-semibold">TODAY’S VISIT</p>
                  <p class="text-lg font-semibold">15,209</p>
                  {/* <p class="text-lg font-semibold">TODAY’S TOTAL SALES</p>
                  <p class="text-lg font-semibold">$29,115.50</p> */}
                {/* </div> */}
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
                            // fontSize: 10,
                            // padding: 0,
                          }}

                        />
                      }
                      title="Tasks"
                    // value={}
                    />
                    <DashboardCard
                      icon={
                        <ShoppingOutlined
                          className="text-xl p-2 lg:text-3xl lg:p-4"
                          style={{
                            color: "blue",
                            backgroundColor: "#F8F8FB",
                            borderRadius: 40,
                            // fontSize: 5,
                            // padding: 20,
                          }}
                        />
                      }
                      title={"Product"}
                    // value={}
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
                            // fontSize: 10,
                            // padding: 5,
                          }}
                        />
                      }
                      title={"Employee"}
                    // value={"110"}
                    />
                    <DashboardCard
                      icon={
                        <DollarCircleOutlined
                        className="text-xl p-2 lg:text-3xl lg:p-4"
                          style={{
                            color: "red",
                            backgroundColor: "#F8F8FB",
                            borderRadius: 40,
                            // fontSize: 25,
                            // padding: 20,
                          }}
                        />
                      }
                      title={"Revenue"}
                    // value={}
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

        {/* <AddProduct/>
    <TaskButton/>
    <Button
    onClick={()=> {
      localStorage.removeItem("token")
      navigate("/");}}
    >
      logout
    </Button> */}
        {/* <img src={bulb} alt="" /> */}
      </Space>
    </Space>

  );
}

export default Dashboard;
