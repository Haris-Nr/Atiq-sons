import React, { useEffect, useRef, useState } from "react";
import { Rate, Table, Input, Image, Tag, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ProductButton from "./ProductButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Productsbyemployee } from "../../redux/Features/Product/productSlice";
import Highlighter from "react-highlight-words";
const { Search } = Input;

const LahoreProductTable = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.fetch);
  const { employee } = user;
  const { fetchProductData, isLoading } = useSelector((state) => state.product);

  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  useEffect(() => {
    dispatch(Productsbyemployee(employee?._id));
  }, [dispatch, employee]);


  const renderColumnWithHighlight = (text) => (
    <Highlighter
      highlightStyle={{
        backgroundColor: "#ffc069",
        padding: 0,
      }}
      searchWords={[searchText]}
      autoEscape
      textToHighlight={text ? text.toString() : ""}
    />
  );

  const columns = [
    {
      title: "SrNo",
      key: "srNo",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      key: "image",
      title: "Thumbnail",
      dataIndex: "image",
      render: (link) => {
        return <Image width={100} src={link} />;
      },
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (text, record) => {
        return (
          <Link to={record.url} target="_blank">
            {renderColumnWithHighlight(text)}
          </Link>
        );
      },
      width:"30%",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => renderColumnWithHighlight(text),
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    // },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, value) => {
        return (<span>${value}</span>), renderColumnWithHighlight(text);
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (text, record) => {
        return <Rate value={record.rating} allowHalf disabled />;
      },
    },
    {
      title: "Asin No",
      dataIndex: "asin",
      key: "asin",
      render: (text) => renderColumnWithHighlight(text),
    },

    // {
    //   title: "Brand",
    //   dataIndex: "brand",
    //   key: "brand",
    // },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => renderColumnWithHighlight(text),
    },
    // {
    //   title: "Seller Name",
    //   dataIndex: "createdBy",
    //   key: "createdBy",
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, { status }) => {
        return (
          renderColumnWithHighlight(text),
          (
            <Tag
              color={`${
                status === "pending"
                  ? "yellow"
                  : status === "rejected"
                  ? "red"
                  : "green"
              }`}
              key={status}
            >
              {status.toUpperCase()}
            </Tag>
          )
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <DeleteOutlined />
          </a>
          <a>
            <EditOutlined />
          </a>
        </Space>
      ),
    },
  ];

  const heading = (
    <div className="flex justify-between">
      <Search
        ref={searchInput}
        size="medium"
        style={{ marginBottom: 2, width: "30%" }}
        onSearch={handleSearch}
        placeholder="Search"
        allowClear
      />
      <ProductButton />
    </div>
  );

  const dataSourceWithKeys = fetchProductData.data
    ? fetchProductData.data
        .filter((item) =>
          Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(searchText.toLowerCase())
        )
        .map((item) => ({
          ...item,
          key: item._id,
        }))
    : [];

  return (
    <div>
      <Table
        // tableLayout="fixed"
        // showHeader
        bordered
        loading={isLoading}
        title={() => heading}
        columns={columns}
        responsive="stack"
        dataSource={dataSourceWithKeys}
        pagination={{
          pageSize: 8,
        }}
        scroll={{
          x: 1500,
        }}
      />
    </div>
  );
};

export default LahoreProductTable;
