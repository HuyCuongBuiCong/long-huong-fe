import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { BiSearchAlt } from "react-icons/bi";
import { GrAdd } from "react-icons/gr";
import Form from "../components/Form";

const Homepage = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [formOpen, setFormOpen] = useState(false);

  const [data, setData] = useState([
    {
      id: 1,
      order_id: "20230815-1027",
      fullName: "Nguyễn Tuấn Anh",
      gender: "Nam",
      yearOfBirth: "1979",
      time: "15:51 15/08/2023",
      phone: "0989898882",
      address: "12 NVC, CanTho",
    },
    {
      id: 2,
      order_id: "20230815-1026",
      fullName: "Nguyễn Thùy Nga",
      gender: "Nữ",
      yearOfBirth: "1984",
      time: "15:19 15/08/2023",
      phone: "0919767882",
      address: "95 TVT, CanTho",
    },
    {
      id: 3,
      order_id: "20230815-1025",
      fullName: "Mỵ Duy Hoàn",
      gender: "Nữ",
      yearOfBirth: "1983",
      time: "14:37 15/08/2023",
      phone: "0929833282",
      address: "38 HV, CanTho",
    },
    {
      id: 4,
      order_id: "20230815-1024",
      fullName: "Đỗ Văn Ni",
      gender: "Nữ",
      yearOfBirth: "1978",
      time: "14:36 15/08/2023",
      phone: "0727823223",
      address: "12 THD, CanTho",
    },
    {
      id: 5,
      order_id: "20230815-1023",
      fullName: "Lê Thị Thanh Tú",
      gender: "Nữ",
      yearOfBirth: "1989",
      time: "14:34 15/08/2023",
      phone: "0387271281",
      address: "92 THD, CanTho",
    },
    {
      id: 6,
      order_id: "20230815-1022",
      fullName: "Cung Văn Tuyên",
      gender: "Nữ",
      yearOfBirth: "1976",
      time: "14:32 15/08/2023",
      phone: "0791678192",
      address: "72 MT, CanTho",
    },
    {
      id: 7,
      order_id: "20230815-1021",
      fullName: "Hồ Thị Duyên",
      gender: "Nữ",
      yearOfBirth: "1982",
      time: "14:31 15/08/2023",
      phone: "0734001223",
      address: "88 LL, CanTho",
    },
    {
      id: 8,
      order_id: "20230815-1020",
      fullName: "Nguyễn Văn Sang",
      gender: "Nam",
      yearOfBirth: "1987",
      time: "14:30 15/08/2023",
      phone: "09012100343",
      address: "12 3/2, CanTho",
    },
  ]);

  const handleDelete = (rowData) => {
    const newData = data.filter(item => item.id !== rowData.id);
    setData(newData);
  };

  return (
    <DefaultLayout>
      <div className="App">
        <h1>Lịch sử khám bệnh</h1>
        <div className="p-d-flex p-jc-between">
          <GrAdd onClick={() => setFormOpen(true)} />
          {formOpen && (
            <Form
              closeForm={() => {
                setFormOpen(false);
              }}
            />
          )}
          <span className="p-input-icon-left">
            <InputText
              type="search"
              onInput={(e) =>
                setFilters({
                  global: {
                    value: e.target.value,
                    matchMode: FilterMatchMode.CONTAINS,
                  },
                })
              }
              placeholder="Search..."
            />
            <BiSearchAlt />
          </span>
        </div>

        <DataTable
          value={data}
          sortMode="multiple"
          filters={filters}
          paginator
          rows={5}
          rowsPerPageOptions={[1, 2, 3, 4, 5]}
          totalRecords={data.length}
        >
        {Object.keys(data[0]).map((fieldName, index) => (
          <Column
            key={index}
            field={fieldName}
            header={fieldName}
            sortable
          ></Column>
        ))} 
          <Column
            body={(rowData) => (
              <span>
                <BsFillPencilFill />
                <BsFillTrashFill
                  className="delete-btn"
                  onClick={() => handleDelete(rowData)}
                />
              </span>
            )}
            style={{ textAlign: "center" }}
          ></Column>
        </DataTable>
      </div>
    </DefaultLayout>
  );
};

export default Homepage;
