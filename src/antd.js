import { useState } from "react";
import { Table } from "antd";
import EditOutlined from "@ant-design/icons";
import SaveOutlined from "@ant-design/icons";

const FilterTable = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const filterData = (data) =>
    data.map((item) => ({
      key: item,
      value: item,
      text: item
    }));

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park"
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park"
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park"
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park"
    },
    {
      key: "5",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park"
    },
    {
      key: "6",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park"
    },
    {
      key: "7",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park"
    },
    {
      key: "8",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park"
    }
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      filters: filterData(
        data
          .map((item) => item.name)
          .filter((value, index, self) => self.indexOf(value) === index)
      ),
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      render: (row, value, key) => {
        console.log(row.name);
        const name = row.name;
        return (
          <div>
            <span>
              {editing ? (
                <div>
                  <input value={name} />{" "}
                  <span>
                    <SaveOutlined />
                  </span>
                </div>
              ) : (
                <div>
                  {row}{" "}
                  <span>
                    <EditOutlined />
                  </span>
                </div>
              )}
            </span>
            {/* <span>
              <EditOutlined onClick={() => setName(row)} />
            </span> */}
          </div>
        );
      },
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: "Age",
      dataIndex: "age",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age
    },
    {
      title: "Address",
      dataIndex: "address",
      filters: [
        {
          text: "London",
          value: "London"
        },
        {
          text: "New York",
          value: "New York"
        }
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0
    }
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default FilterTable;
