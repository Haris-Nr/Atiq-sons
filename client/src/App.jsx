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
import LahoreProductTable from "./components/Lahore/LahoreProductTable";
import LahoreTaskTable from "./components/Lahore/LahoreTaskTable";
import DubaiProductTable from "./components/Dubai/DubaiProductTable";
import TrackProduct from "./components/Lahore/TrackProduct";
import AdminProductTable from "./components/Admin/AdminProductTable";
import NotifyTable from "./components/common/NotifyTable";
import UserInfo from "./components/Admin/UserInfo";

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
        <Route path="lahoreproducttable" element={<LahoreProductTable />} />
        <Route path="tasktable" element={<LahoreTaskTable />} />
        <Route path="trackproduct" element={<TrackProduct />} />

        {/* Lahore Routes */}
        <Route path="dubaiproducttable" element={<DubaiProductTable />} />

        {/* Admin Routes */}
        <Route path="employees" element={<Empolyee />} />
        <Route path="employees/:id"element={<UserInfo/>}/>
        <Route path="logs" element={<Log />} />
        <Route path="productTable" element={<AdminProductTable/>}/>
        <Route path="notification" element={<NotifyTable/>}/>
        <Route path="notification/:id"element={<UserInfo/>}/>


      </Route>
    </Route>
  )
);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
