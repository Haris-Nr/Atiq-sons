import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table, DatePicker } from 'antd';
import { useDispatch } from "react-redux";
import { TrackingProduct } from "../../redux/Features/Product/productSlice";

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const handleSaveInternal = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  const validateQuantity = (rule, value, callback) => {
    const pattern = /^[0-9]*$/; // Only allow numbers
    if (!pattern.test(value)) {
      callback('Please enter a valid quantity (numbers only).');
    } else {
      callback();
    }
  };

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
          dataIndex === 'quantity' && {
            validator: validateQuantity,
          },
        ]}
      >
        {dataIndex === 'date' ? (
          <DatePicker
            ref={inputRef}
            onPressEnter={handleSaveInternal}
            onBlur={handleSaveInternal}
          />
        ) : (
          <Input ref={inputRef} onPressEnter={handleSaveInternal} onBlur={handleSaveInternal} />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const TrackProduct = () => {
  const dispatch = useDispatch();

  const [dataSource, setDataSource] = useState([
    {
      key: "0",
      productName: 'Enter Product Name',
      date: new Date(),
      quantity: 'Enter Product Quantity',
    },
  ]);

  const [count, setCount] = useState(1);

  const defaultColumns = [
    {
      title: "Name",
      dataIndex: "productName",
      width: "30%",
      editable: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      // editable: true,
      render: (_, record) => record.date.toISOString().split('T')[0],
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => (
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to submit?" onConfirm={() => dispatch(TrackingProduct(record))}>
            <a>submit</a>
          </Popconfirm>
        ) : null
      ),
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: count,
      productName: 'Enter Product Name',
      date: new Date(),
      quantity: 'Enter Product Quantity',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    try {
      const formattedDate = row.date ? row.date.toISOString() : null;
      dispatch(
        TrackingProduct({
          ...row,
          date: formattedDate,
        })
      );

      const newData = [...dataSource];
      const index = newData.findIndex((item) => row.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      setDataSource(newData);
    } catch (err) {
      console.error('Error saving data to MongoDB:', err);
    }
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        scroll={{
          x: 1500 // Make sure to use curly braces {} to create an object
        }}
      />
    </div>
  );
};

export default TrackProduct;
