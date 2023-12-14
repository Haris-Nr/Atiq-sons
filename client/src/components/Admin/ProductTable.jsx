import { Avatar, Rate, Table, Typography,Tag } from "antd";


const ProductTable = () => {


 

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
        columns={columns}
        scroll={{
          x: 1500,
        }}
        pagination={{
          pageSize: 8,
        }}
      />
    </div>
  );
};
export default ProductTable;
