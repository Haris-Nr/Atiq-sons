import { Avatar, Rate, Table, Typography,Tag } from "antd";
import { useEffect, useState } from "react";
import { getProduct } from "..";

const Product = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getProduct().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  const columns = [
    {
      key:"thumbnail",
      title: "Thumbnail",
      dataIndex: "thumbnail",
      headerColor:"red",
      render: (link) => {
        return <Avatar src={link} />;
      },
      
    },
    {
      title: "Product Name",
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
      title: "Asin No",
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
    {
      title: "Seller Name",
      dataIndex: "category",
    },
    {
      title: "Status",
      dataIndex: "category",
      render: (_, { category }) => (
        <>
         <Tag color="red">
                {category.toUpperCase()}
          </Tag>
        </>
      ),
    },
    
  ];

  return (
    <div>
      <Typography.Title level={4}>Product</Typography.Title>
     

      <Table
        loading={loading}
        columns={columns}
        scroll={{
          x: 1500,
        }}
        dataSource={dataSource}
        pagination={{
          pageSize: 8,
        }}
      />
    </div>
  );
};
export default Product;