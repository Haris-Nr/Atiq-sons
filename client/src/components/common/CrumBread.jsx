import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";

const CrumBread = () => {
  const location = useLocation();
  const { pathname } = location;
  const pathnames = pathname.split("/").filter((item) => item);
  const { employeeDetails } = useSelector((state) => state.employee);

  const isObjectId = (item) => {
    return /^[0-9a-fA-F]{24}$/.test(item);
  };
  const getTitle = (item) => {
    if (isObjectId(item)) {
      return employeeDetails?.employee?.fullname;
    }
    return item.charAt(0).toUpperCase() + item.slice(1);
  };

  const items = pathnames.map((item, index) => ({
    path: `/${item}`,
    title: getTitle(item),
    key: index,
  }));
  const itemRender = (route, params, items) => {
    const last = items.indexOf(route) === items.length - 1;
    return last ? (
      <span>{route.title}</span>
    ) : (
      <Link to=".." relative="path">
        {route.title}
      </Link>
    );
  };
  return (
    <>
      <Breadcrumb
        itemRender={itemRender}
        items={items}
        style={{ margin: "20px 0" }}
        className="pt-12 sm:pt-6"
      />
    </>
  );
};

export default CrumBread;
