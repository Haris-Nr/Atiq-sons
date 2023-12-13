import { Card, Space, Typography } from 'antd';
import React from 'react'

const DashboardCard = ({ icon, title, value }) => {
    return (
        <Card className="relative flex flex-col mb-4 text-gray-700 bg-white shadow-md w-82 rounded-xl bg-clip-border">
          <Space direction="horizontal" className="items-center ">
            {icon}
            <Typography.Text className="mb-2 ml-2 font-sans text-xl font-semibold tracking-normal text-blue-gray-900">{title}</Typography.Text>
            <Typography.Text className="mb-2 ml-2 font-semibold text-blue-gray-900">{value}</Typography.Text>
          </Space>
        </Card>
      );
}

export default DashboardCard
