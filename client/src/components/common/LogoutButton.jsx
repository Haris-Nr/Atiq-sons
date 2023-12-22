// Import necessary modules
import React from 'react';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/Features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";


const LogoutButton = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const {logoutData} = useSelector((state)=> state.auth)
  const {user} = useSelector((state)=> state.fetch)



  const handleLogout = () => {
    dispatch(logoutUser(user.employee._id));
    sessionStorage.removeItem("token");
    Navigate('/');
    message.success(logoutData.message);
  };
  

  return (
    <div onClick={handleLogout} className='text-red-500 text-2xl cursor-pointer' >
      <TbLogout />
    </div>
  );
};

export default LogoutButton;
