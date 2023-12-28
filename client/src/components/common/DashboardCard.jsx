import { Space, Typography } from "antd";
import PropTypes from 'prop-types'
import React from "react";

const DashboardCard = ({ icon, title, value }) => {
  return (
    <div className="relative flex justify-center text-gray-700 bg-white shadow-md p-1 items-center h-16 my-5 w-[10rem] md:w-[9.5rem] lg:w-[13.5rem] lg:h-20 rounded-none bg-clip-border">
      <Space direction="horizontal" className="items-center ">
        {icon}
        <Typography.Text className="font-sans lg:text-xl font-semibold tracking-normal text-blue-gray-900">
          {title}
        </Typography.Text>
        <Typography.Text className="font-semibold text-blue-gray-900">
          {value}
        </Typography.Text>
      </Space>
    </div>
  );
};
DashboardCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default DashboardCard;
