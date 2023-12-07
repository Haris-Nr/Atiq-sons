
/////////////////////////////////////
import { Card, Flex } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";

// const cardStyle = {
//   width: 620,
// };

const imgStyle = {
  display: "block",
  width: 360,
};

const Loginlayout = () => {
  return (
    <Flex justify="center" align="center" className="bg-blue-100 min-h-screen">
      <Card
        className=""
        // style={cardStyle}
        bodyStyle={{
          padding: 0,
          overflow: "hidden",
        }}
      >
        <Flex justify="space-between" className="text-center flex flex-wrap">
          <img
            alt="avatar"
            src="door-rbg.png"
            style={imgStyle}
            className="bg-blue-200 min-w-full"
          />
         <div className="m-auto">
          <Outlet />
          </div>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Loginlayout;
