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
import Log from "./components/Admin/LogTable";
import Dashboard from "./components/common/Dashboard";
import DashboardLayout from "./components/Layout/DashboardLayout";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import LahoreProductTable from "./components/Lahore/LahoreProductTable";
import LahoreTaskTable from "./components/Lahore/LahoreTaskTable";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Loginlayout />}>
        <Route index element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="resetpassword" element={<ResetPassword />} />
      </Route>

      <Route path="/:dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        {/* Lahore Routes */}
        <Route path="producttable" element={<LahoreProductTable />} />
        <Route path="tasktable" element={<LahoreTaskTable />} />

        {/* Admin Routes */}
        <Route path="employees" element={<Empolyee />} />
        <Route path="logs" element={<Log />} />
      </Route>
    </Route>
  )
);

function App() {
  const { isLoading } = useSelector((state) => state.fetch);

  return (
    <>
      {isLoading && <Spin />}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
