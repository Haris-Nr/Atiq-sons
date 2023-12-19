import React, { useEffect, useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Avatar, Rate, Table, Dropdown, Button, Input, Menu, Space } from 'antd';
// import { EllipsisOutlined, EyeOutlined,DeleteOutlined , EditOutlined} from '@ant-design/icons';
import { useState } from "react";
import ProductButton from './ProductButton';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Productsbyemployee } from '../../redux/Features/Product/productSlice';
import Highlighter from 'react-highlight-words';



const LahoreProductTable = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=> state.fetch)
  const {employee} = user;
  const { fetchProductData } = useSelector((state) => state.product);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });



  useEffect(() => {
    dispatch(Productsbyemployee(employee?._id));
  }, [dispatch,employee]);

  // const menu = (record) => (
  //   <Menu>
  //     <Menu.Item key="edit" icon={<EditOutlined />}>
  //       <a href={`/edit/${record.key}`}>Edit</a>
  //     </Menu.Item>
  //     <Menu.Item key="delete"  icon={<DeleteOutlined />}>Delete</Menu.Item>
  //     <Menu.Item key="activate" icon={<EyeOutlined  />}>View</Menu.Item>
  //   </Menu>
  // );

  const columns = [
    {
      title: "SrNo",
      key: "srNo",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      key: 'image',
      title: 'Thumbnail',
      dataIndex: 'image',
      headerColor: 'red',
      render: (link) => <Avatar src={link} />,
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key:'productName',
      render: (_,record) => {
        return (
          <Link to={record.url} >
        {record.productName}
      </Link>
        )
      }, 
      ...getColumnSearchProps('name')
    },
    {
      title:"Quantity",
      dataIndex:'quantity',
      key:'quantity'
    },
    {
      title:"Description",
      dataIndex:'description',
      key:'description'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
     

      render: (value) => <span>${value}</span>,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key:'rating',
     

      render: (_, record) => <Rate value={record.rating} allowHalf disabled />,
    },
    {
      title: 'Asin No',
      dataIndex: 'asin',
     key:'asin',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
     key:"brand",
    },
    {
      title: 'Category',
      dataIndex: 'category',
     key:'category',
    },
    {
      title: 'Seller Name',
      dataIndex: 'createdBy',
     key:'createdBy'
    },
    {
      title:"Status",
      dataIndex:"status",
      key:"status"
    },
    // {
    //   title: 'Action',
    //   dataIndex: 'action',
    //   render: (_, record) => (
    //     <Dropdown menu={menu(record)} placement="bottomLeft" arrow>
    //       <Button icon={<EllipsisOutlined />}/>
    //     </Dropdown>
    //   ),
    // },
  ];
  

  const heading = (
    <div className="flex gap-20 " >
   
    <Input.Search
     
      placeholder="Search Product..."
      size="medium"
      style={{ marginBottom: 2, width: '30%' }}
      onSearch={(value) => setSearchText(value)}
    />
  
    <ProductButton/>
  </div>
  );

  const dataSourceWithKeys = fetchProductData.data
  ? fetchProductData.data.map((item) => ({
    ...item,
    key: item._id,
  }))
  : [];

  return (
    <div>
      <Table
        title={() => heading}
        columns={columns}
        dataSource={dataSourceWithKeys}
        scroll={{
          x: 1100,
        }}
        pagination={false}
      />
    </div>
  );
};

export default LahoreProductTable;
