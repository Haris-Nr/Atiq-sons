<<<<<<< HEAD
import { Avatar, Rate, Table, Typography,Tag } from "antd";
import { useEffect, useState } from "react";
import { getProduct } from "..";
=======
import { Avatar, Rate, Table, Typography,Tag, Dropdown, Button, Menu, } from "antd";
import { useEffect, useState } from "react";
import { getProduct } from "..";
import AddProduct from "../Lahore/ProductButton";
>>>>>>> 131a352 (bilal)

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
<<<<<<< HEAD
    {
      key:"thumbnail",
      title: "Thumbnail",
      dataIndex: "thumbnail",
      headerColor:"red",
      render: (link) => {
        return <Avatar src={link} />;
      },
      
=======
    
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      className:"bg-purple-50",
      render: (link) => {
        return <Avatar src={link} />;
      },
>>>>>>> 131a352 (bilal)
    },
    {
      title: "Product Name",
      dataIndex: "title",
<<<<<<< HEAD
=======
      key: "title",
      className:"bg-purple-50",
>>>>>>> 131a352 (bilal)
    },
    {
      title: "Price",
      dataIndex: "price",
<<<<<<< HEAD
=======
      key: "price",
      className:"bg-purple-50",
>>>>>>> 131a352 (bilal)
      render: (value) => <span>${value}</span>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
<<<<<<< HEAD
=======
      key: "rating",
      className:"bg-purple-50",
>>>>>>> 131a352 (bilal)
      render: (rating) => {
        return <Rate value={rating} allowHalf disabled />;
      },
    },
    {
      title: "Asin No",
      dataIndex: "stock",
<<<<<<< HEAD
=======
      key: "stock",
      className:"bg-purple-50",
>>>>>>> 131a352 (bilal)
    },

    {
      title: "Brand",
      dataIndex: "brand",
<<<<<<< HEAD
=======
      key: "brand",
      className:"bg-purple-50",
>>>>>>> 131a352 (bilal)
    },
    {
      title: "Category",
      dataIndex: "category",
<<<<<<< HEAD
=======
      key: "category",
      className:"bg-purple-50",
>>>>>>> 131a352 (bilal)
    },
    {
      title: "Seller Name",
      dataIndex: "category",
<<<<<<< HEAD
=======
      key: "category",
      className:"bg-purple-50",
>>>>>>> 131a352 (bilal)
    },
    {
      title: "Status",
      dataIndex: "category",
<<<<<<< HEAD
      render: (_, { category }) => (
        <>
         <Tag color="red">
=======
      key: "category",
      className:"bg-purple-50",
      render: (_, { category }) => (
        <>
         <Tag color="purple">
>>>>>>> 131a352 (bilal)
                {category.toUpperCase()}
          </Tag>
        </>
      ),
    },
<<<<<<< HEAD
=======
    {
      title: "Action",
      dataIndex: "",
      key: 'action',
      className:"bg-purple-50",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit">Edit</Menu.Item>
              <Menu.Item key="view">View</Menu.Item>
              <Menu.Item key="read">Read</Menu.Item>
            </Menu>
          }
        >
         <Tag color="purple">
          ...
          </Tag>
        </Dropdown>
      ),
    }
>>>>>>> 131a352 (bilal)
    
  ];

  return (
    <div>
<<<<<<< HEAD
      <Typography.Title level={4}>Product</Typography.Title>
     

      <Table
=======
     
      <div  className="bg-white flex items-center justify-between">
      <Typography.Title level={4}>Product</Typography.Title>
      <AddProduct />
      </div>
      <Table
        style={{
          background: "#f9f0ff"
      }}
>>>>>>> 131a352 (bilal)
        loading={loading}
        columns={columns}
        scroll={{
          x: 1500,
        }}
        dataSource={dataSource}
        pagination={{
          pageSize: 8,
        }}
<<<<<<< HEAD
      />
    </div>
  );
};
=======
        />
    </div>
  );
};

>>>>>>> 131a352 (bilal)
export default Product;
