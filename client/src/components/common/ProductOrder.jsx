import React, { useRef, useState } from "react";
import { Table, Input, Tag, Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Search } = Input;

const ProductOrder = () => {
  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const [selectedStatus, setSelectedStatus] = useState("Show All"); // Initial value

  const handleMenuClick = (e) => {
    // Update the selected status when a menu item is clicked
    setSelectedStatus(e.key);
  };

  const columns = [
    {
      title: "ORDER ID",
      dataIndex: "orderid",
    },
    {
      key: "CREATED",
      title: "CREATED",
      dataIndex: "created",
    },
    {
      title: "CUSTOMER",
      dataIndex: "customer",
      key: "productName",
    },
    {
      title: "TOTAL",
      dataIndex: "total",
      key: "1",
    },

    {
      title: "PROFIT",
      dataIndex: "profit",
      key: "price",
    },

    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  const data = [
    {
      orderid: "#XTD-4629",
      created: "2 mins ago",
      customer: (
        <div className="flex items-center font-bold">
          <img
            src="user1.jpg"
            alt="Customer Image"
            className="w-8 rounded-full mx-3"
          />
          Bilal{" "}
        </div>
      ),
      total: "$650",
      profit: "$150",
      status: <Tag color="purple">pending</Tag>,
    },
    {
      orderid: "#XTD-4629",
      created: "2 mins ago",
      customer: (
        <div className="flex items-center font-bold">
          <img
            src="user2.jpg"
            alt="Customer Image"
            className="w-8 rounded-full mx-3"
          />
          Jennica
        </div>
      ),
      total: "$650",
      profit: "$150",
      status: <Tag color="green">confirmed</Tag>,
    },
    {
      orderid: "#XTD-4629",
      created: "2 mins ago",
      customer: (
        <div className="flex items-center font-bold">
          <img
            src="user3.jpg"
            alt="Customer Image"
            className="w-8 rounded-full mx-3"
          />
          Haris
        </div>
      ),
      total: "$650",
      profit: "$150",
      status: <Tag color="purple">pending</Tag>,
    },
    {
      orderid: "#XTD-4629",
      created: "2 mins ago",
      customer: (
        <div className="flex items-center font-bold">
          <img
            src="user4.jpg"
            alt="Customer Image"
            className="w-8 rounded-full mx-3"
          />
          Iqra
        </div>
      ),
      total: "$650",
      profit: "$150",
      status: <Tag color="orange">deliverd</Tag>,
    },
    {
      orderid: "#XTD-4629",
      created: "2 mins ago",
      customer: (
        <div className="flex items-center font-bold">
          <img
            src="user13.jpg"
            alt="Customer Image"
            className="w-8 rounded-full mx-3"
          />
          Tehreem
        </div>
      ),
      total: "$650",
      profit: "$150",
      status: <Tag color="green">shipped</Tag>,
    },
    {
      orderid: "#XTD-4629",
      created: "2 mins ago",
      customer: (
        <div className="flex items-center font-bold">
          <img
            src="user1.jpg"
            alt="Customer Image"
            className="w-8 rounded-full mx-3"
          />{" "}
          Bilal{" "}
        </div>
      ),
      total: "$650",
      profit: "$150",
      status: <Tag color="red">rejected</Tag>,
    },
    {
      orderid: "#XTD-4629",
      created: "2 mins ago",
      customer: (
        <div className="flex items-center font-bold">
          <img
            src="user4.jpg"
            alt="Customer Image"
            className="w-8 rounded-full mx-3"
          />
          Iqra
        </div>
      ),
      total: "$650",
      profit: "$150",
      status: <Tag color="red">rejected</Tag>,
    },
  ];

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Show All">Show All</Menu.Item>
      <Menu.Item key="In Stock">In stock</Menu.Item>
    </Menu>
  );

  const heading = (
    <div className="sm:flex justify-between">
      <p className="font-bold text-xl">Product Order</p>
      <div>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <Button>
              status {selectedStatus} <DownOutlined />
            </Button>
          </a>
        </Dropdown>
      </div>
      <div>
        <Search
          ref={searchInput}
          size="large"
          className="rounded-xl"
          style={{
            marginBottom: 2,
            width: "100%",
            backgroundColor: "#6560F0",
            hoverBackgroundColor: "6560F0",
          }}
          onSearch={handleSearch}
          placeholder="Search"
          allowClear
        />
      </div>
    </div>
  );

  return (
    <div>
      <Table
        bordered
        title={() => heading}
        columns={columns}
        responsive="stack"
        dataSource={data}
        showPagination={false}
        scroll={{
          x: 800,
        }}
      />
    </div>
  );
};

export default ProductOrder;
