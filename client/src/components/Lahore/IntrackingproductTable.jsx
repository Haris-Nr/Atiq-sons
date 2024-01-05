import React, { useEffect, useRef, useState } from "react";
import { Table, Input, Image, Tag } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIntrackingProduct, setCurrentPage, setPageSize } from "../../redux/Features/Product/productSlice";
import Highlighter from "react-highlight-words";
const { Search } = Input;

const IntrackingproductTable = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.fetch);
    const { employee } = user;
    const {
        IntrackingProductdata,
        isLoading,
        totalItems,
        currentPage,
        pageSize, } = useSelector((state) => state.product);
    const [searchText, setSearchText] = useState("");
    const searchInput = useRef(null);

    const handleSearch = (value) => {
        setSearchText(value);
    };


    useEffect(() => {
        if (employee?._id) {
            dispatch(getIntrackingProduct(employee?._id));
        }
    }, [dispatch, employee, currentPage, pageSize]);

    const handleTableChange = (pagination) => {
        dispatch(setCurrentPage(pagination.current));
        dispatch(setPageSize(pagination.pageSize));
    };




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
            title: "Asin No",
            dataIndex: "asin",
            key: "asin",
            render: (text) => renderColumnWithHighlight(text),
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
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text, { status }) => (
                <>
                    <Tag
                        color={
                            status === "pending"
                                ? "yellow"
                                : status === "rejected"
                                    ? "red"
                                    : "green"
                        }
                    >
                        {renderColumnWithHighlight(status.toUpperCase())}
                    </Tag>
                </>
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
        </div>
    );

    const dataSourceWithKeys = IntrackingProductdata.data
        ? IntrackingProductdata.data
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
                bordered
                loading={isLoading}
                title={() => heading}
                columns={columns}
                dataSource={dataSourceWithKeys}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: totalItems,
                    showTotal: (total) => `Total ${total} items`,
                }}
                onChange={handleTableChange}
                scroll={{
                    x: 1500,
                }}
            />
        </div>
    );
};

export default IntrackingproductTable;
