import { Table, Tag, Image, message, Popconfirm, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Highlighter from "react-highlight-words";
import Search from "antd/es/input/Search";
import ProductButton from "../Lahore/ProductButton";
import {
  AllProduct,
  ProductStatus,
  deleteProductbyId,
  resetDeleteState,
  resetProductStatusState,
} from "../../redux/Features/Product/productSlice";
import { Link } from "react-router-dom";

const AdminProductTable = () => {

  const dispatch = useDispatch();
  
  const { AllProductData, isLoading, deleteProductData, productStatusData } = useSelector((state) => state.product)

  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (value) => {
    setSearchText(value);
  };

  const renderColumnWithHighlight = (text) => (
    <Highlighter
      highlightStyle={{
        backgroundColor: "yellow",
        padding: 0,
      }}
      searchWords={[searchText]}
      autoEscape
      textToHighlight={text ? text.toString() : ""}
    />
  );

  useEffect(() => {
    dispatch(AllProduct());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProductbyId(id)).then(() => {
      dispatch(AllProduct());
    });
  };
  useEffect(() => {
    if (deleteProductData.success === true) {
      message.success(deleteProductData.message);
      dispatch(resetDeleteState());
    } else if (deleteProductData.success === false) {
      message.error(deleteProductData.message);
      dispatch(resetDeleteState());
    }
  }, [deleteProductData, dispatch]);



  const handleStatus = (id, newStatus) => {
    dispatch(ProductStatus({ id, newStatus })).then(() => {
      dispatch(AllProduct());
    });
  };
  useEffect(() => {
    if (productStatusData.success === true) {
      message.success(productStatusData.message);
      dispatch(resetProductStatusState());
    } else if (productStatusData.success === false) {
      message.error(productStatusData.message);
      dispatch(resetProductStatusState());
    }
  }, [productStatusData, dispatch]);


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
      width: "30%",
    },
    {
      title: "Seller",
      dataIndex: "seller",
      key: "quantity",
      render: (text) => renderColumnWithHighlight(text),
    },
    // {
    //   title: "Quantity",
    //   dataIndex: "quantity",
    //   key: "quantity",
    //   render: (text) => renderColumnWithHighlight(text),
    // },
    // {
    //   title: "Price",
    //   dataIndex: "price",
    //   key: "price",
    //   render: (text, value) => {
    //     return (<span>${value}</span>), renderColumnWithHighlight(text);
    //   },
    // },
    // {
    //   title: "Rating",
    //   dataIndex: "rating",
    //   key: "rating",
    //   render: (text, record) => {
    //     return <Rate value={record.rating} allowHalf disabled />;
    //   },
    // },
    {
      title: "Asin No",
      dataIndex: "asin",
      key: "asin",
      render: (text) => renderColumnWithHighlight(text),
    },
    // {
    //   title: "Category",
    //   dataIndex: "category",
    //   key: "category",
    //   render: (text) => renderColumnWithHighlight(text),
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
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
          <Popconfirm
            title={`Are you sure to ${
              record.status === "pending" ? "approved/rejected" : "pending"
            }  this product?`}
            onConfirm={() =>
              handleStatus(
                record._id,
                `${record.status === "pending" ? "approved" : "pending"}`
              )
            }
            onCancel={() =>
              handleStatus(
                record._id,
                `${record.status === "pending" ? "rejected" : "pending"}`
              )
            }
            okText={`${record.status === "pending" ? "approved" : "pending"}`}
            cancelText={`${record.status === "pending" ? "rejected" : ""}`}
          >
            <EditOutlined />
          </Popconfirm>
        </Space>
      ),
      key:"action"
    },
  ];

  const dataSourceWithKeys = AllProductData.data
    ? AllProductData.data
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

  const head = (
    <div className="flex justify-between ">
      <Search
        ref={searchInput}
        size="medium"
        style={{ marginBottom: 2, width: "30%" }}
        onSearch={handleSearch}
        placeholder="Search"
        allowClear
      />
      <div className=" relative w-full px-4 max-w-full flex-grow flex-1 text-right ">
        <ProductButton />
      </div>
    </div>
  );

  return (
    <div>
      <Table
        bordered
        loading={isLoading}
        title={() => head}
        columns={columns}
        dataSource={dataSourceWithKeys}
        scroll={{ x: 1500 }}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
};

export default AdminProductTable;
