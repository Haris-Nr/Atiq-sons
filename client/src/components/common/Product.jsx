import { Avatar, Rate, Space, Table, Typography, Input } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";  
import {SearchOutlined } from '@ant-design/icons'
import { getProduct } from "..";


const Product = () => {
  console.log("Rendering Product component");

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getProduct().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  return (
    <Space size={20} direction="vertical" className="flex flex-col min-w-full py-2 overflow-x-auto sm:-mx-6 lg:-mx-8 sm:px-6 lg:px-8">
    <Typography.Title level={4}>Product</Typography.Title>
    <div className="flex ">
    <div className="flex items-center justify-center sm:justify-start">
  <Input
    className="w-full max-w-md bg-blue-300 rounded "
    addonAfter={<SearchOutlined />}
  />
</div>


    
    <div className="relative flex-1 flex-grow w-full max-w-full px-4 text-right">
    <Link to="/addproduct">
  <button className="px-3 py-1 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-sky-500 hover:bg-sky-700 focus:outline-none" type="button">
    Add Product
  </button>
</Link>
    </div>
    </div>

      <Table className="min-w-full text-sm font-light text-left"
        loading={loading}
        columns={[
          {
            title: "Thumbnail",
            dataIndex: "thumbnail",
            render: (link) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Rating",
            dataIndex: "rating",
            render: (rating) => {
              return <Rate value={rating} allowHalf disabled />;
            },
          },
          {
            title: "Stock",
            dataIndex: "stock",
          },

          {
            title: "Brand",
            dataIndex: "brand",
          },
          {
            title: "Category",
            dataIndex: "category",
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default Product;
