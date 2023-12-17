import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Loginlayout from "./components/Layout/Loginlayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Empolyee from "./components/Admin/EmpolyeeTable";
import Custom from "./components/common/Custom";
import Log from "./components/Admin/LogTable";
import Task from "./components/common/TaskTable";
import Dashboard from "./components/common/Dashboard";
import AddTask from "./components/Admin/TaskForm";
import ProductTable from "./components/Admin/ProductTable";
import DashboardLayout from "./components/Layout/DashboardLayout";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { message } from 'antd';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Loginlayout />}>
        <Route index element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="resetpassword" element={<ResetPassword/>}/>
      </Route>

      <Route path="/:dashboard" element={<DashboardLayout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="empolyee" element={<Empolyee/>}/>
        <Route path="custom" element={<Custom/>}/>
        <Route path="log" element={<Log/>}/>
        <Route path="task" element={<Task/>}/>
        <Route path="product" element={<ProductTable/>}/>
        <Route path="addTask" element={<AddTask/>}/>
      </Route>
    </Route>
  )
);

function App() {
  const [messageApi,contextHolder] = message.useMessage();
  const {isLoading} = useSelector((state)=> state.fetch)

  return (
    <>
     {contextHolder}
    {isLoading && <Spin/>}
  <RouterProvider router={router} messageApi = {messageApi.success}  />
  </>
  );
}

export default App;
