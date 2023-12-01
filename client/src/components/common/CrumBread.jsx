import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";

const CrumBread = () => {
  const location = useLocation();
  const { pathname } = location;
  const pathnames = pathname.split("/").filter((item) => item);
  const items = pathnames.map((item, index) => ({
    path: `/${item}`,
    title: item.charAt(0).toUpperCase() + item.slice(1),
    key: index,
  }));
  const itemRender = (route, params, items, paths) => {
    const last = items.indexOf(route) === items.length - 1;
    return last ? (
      <span>{route.title}</span>
    ) : (
      <Link to={paths.join("/")}>{route.title}</Link>
    );
  };
  return (
    <>
      <Breadcrumb itemRender={itemRender} items={items} className="p-3" />
    </>
  );
};

export default CrumBread;
