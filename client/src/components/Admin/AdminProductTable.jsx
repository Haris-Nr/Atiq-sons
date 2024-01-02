import { Table, Tag, Image, message, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highlighter from "react-highlight-words";
import Search from "antd/es/input/Search";
import ProductButton from "../Lahore/ProductButton";
import {
  AllProduct,
  ProductStatus,
  TrackStatus,
  deleteProductbyId,
  resetDeleteState,
  resetProductStatusState,
  resetTrackStatusState
} from "../../redux/Features/Product/productSlice";
import { Link } from "react-router-dom";
import DeleteButton from "../common/DeleteButton";
import ChangeStatusButton from "../common/ChangeStatusButton";
import ChangeTrackStatusButton from "../common/ChangeTrackStatusButton";

const AdminProductTable = () => {

  const dispatch = useDispatch();

  const { AllProductData, isLoading, deleteProductData, productStatusData,trackStatusData } =
    useSelector((state) => state.product);

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

  const handleTrack = (id, newStatus) => {
    dispatch(TrackStatus({ id, newStatus })).then(() => {
      dispatch(AllProduct());
    });
  };

  useEffect(() => {
    if (trackStatusData.success === true) {
      message.success(trackStatusData.message);
      dispatch(resetTrackStatusState());
    } else if (trackStatusData.success === false) {
      message.error(trackStatusData.message);
      dispatch(resetTrackStatusState());
    }
  }, [trackStatusData, dispatch]);

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
      dataIndex: "url",
      render: (_, record) => {
        return <Image width={100} src={record.image[0].url} />;
      },
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (text, record) => {
        return (
          <Link to={`${record._id}`} key={record._id}>
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
    {
      title: "Asin No",
      dataIndex: "asin",
      key: "asin",
      render: (text) => renderColumnWithHighlight(text),
    },
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
      title: "Track Progress",
      dataIndex: "tracking",
      key: "tracking",
      render: (text, { tracking }) => {
        return (
          renderColumnWithHighlight(text),
          (
            <Tag
              color={`${tracking === "pending"
                  ? "yellow"
                  : tracking === "tracked"
                    ? "purple"
                    : "green"
                }`}
              key={tracking}
            >
              {tracking.toUpperCase()}
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
          <DeleteButton onConfirmDelete={() => handleDelete(record._id)} />
          <ChangeStatusButton
            itemType="product"
            Id={record._id}
            currentStatus={record.status}
            onChangeStatus={handleStatus}
          />
           <ChangeTrackStatusButton
            itemType="product"
            Id={record._id}
            currentStatus={record.tracking}
            onChangeStatus={handleTrack}
          />
        </Space>
      ),
      key: "action",
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
