import './App.css'
import { Route, RouterProvider,
  createBrowserRouter,
  createRoutesFromElements} from "react-router-dom";
import LayOut from './components/Layout/LayOut';
import TableData from './components/Common/TableData';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Loginlayout from './components/Layout/Loginlayout';

  const router = createBrowserRouter(createRoutesFromElements(

    <Route>
      <Route path='/' element={<Loginlayout/>}>
    <Route index element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    </Route>

     <Route path="/admin" element={<LayOut/>}>
      <Route index element={<TableData/>} />  
        </Route>

        </Route>
))


function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App

// #6A49F2
