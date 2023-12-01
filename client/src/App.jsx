import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Loginlayout from "./components/Layout/Loginlayout";
import DashboardLayOut from "./components/Layout/DashboardLayOut";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Empolyee from "./components/Admin/Empolyee";
import Custom from "./components/common/Custom";
import Log from "./components/Admin/Log";
import Task from "./components/common/Task";
import Dashboard from "./components/common/Dashboard";
import Product from "./components/common/Product";
import AddTask from "./components/Admin/TaskForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Loginlayout />}>
        <Route index element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="forgetpassword" element={<ForgetPassword/>}/>
        <Route path="resetpassword" element={<ResetPassword/>}/>
      </Route>

      <Route path="/:dashboard" element={<DashboardLayOut/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="empolyee" element={<Empolyee/>}/>
        <Route path="custom" element={<Custom/>}/>
        <Route path="log" element={<Log/>}/>
        <Route path="task" element={<Task/>}/>
        <Route path="product" element={<Product/>}/>
        <Route path="addTask" element={<AddTask/>}/>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
