import React, { useState } from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { BiSearchAlt } from "react-icons/bi";
import { Button } from "primereact/button";
import Form from "./Form";

const HistoryTable = () => {
  const [showForm, setShowForm] = useState(false);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const handleDelete = (rowData) => {
    const newData = data.filter((item) => item.id !== rowData.id);
    setData(newData);
  };

  const [data, setData] = useState([
    {
      id: 1,
      // order_id: "20230815-1027",
      fullName: "Nguyễn Tuấn Anh",
      // gender: "Nam",
      yearOfBirth: "1979",
      phone: "0989898882",
      time: "15:51 15/08/2023",
      address: "12 NVC, CanTho",
    },
    {
      id: 2,
      // order_id: "20230815-1026",
      fullName: "Nguyễn Thùy Nga",
      // gender: "Nữ",
      yearOfBirth: "1984",
      phone: "0919767882",
      time: "15:19 15/08/2023",
      address: "95 TVT, CanTho",
    },
    {
      id: 3,
      // order_id: "20230815-1025",
      fullName: "Mỵ Duy Hoàn",
      // gender: "Nữ",
      yearOfBirth: "1983",
      phone: "0929833282",
      time: "14:37 15/08/2023",
      address: "38 HV, CanTho",
    },
    {
      id: 4,
      // order_id: "20230815-1024",
      fullName: "Đỗ Văn Ni",
      // gender: "Nữ",
      yearOfBirth: "1978",
      phone: "0727823223",
      time: "14:36 15/08/2023",
      address: "12 THD, CanTho",
    },
    {
      id: 5,
      // order_id: "20230815-1023",
      fullName: "Lê Thị Thanh Tú",
      // gender: "Nữ",
      yearOfBirth: "1989",
      phone: "0387271281",
      time: "14:34 15/08/2023",
      address: "92 THD, CanTho",
    },
    {
      id: 6,
      // order_id: "20230815-1022",
      fullName: "Cung Văn Tuyên",
      // gender: "Nữ",
      yearOfBirth: "1976",
      phone: "0791678192",
      time: "14:32 15/08/2023",
      address: "72 MT, CanTho",
    },
    {
      id: 7,
      // order_id: "20230815-1021",
      fullName: "Hồ Thị Duyên",
      // gender: "Nữ",
      yearOfBirth: "1982",
      phone: "0734001223",
      time: "14:31 15/08/2023",
      address: "88 LL, CanTho",
    },
    {
      id: 8,
      // order_id: "20230815-1020",
      fullName: "Nguyễn Văn Sang",
      // gender: "Nam",
      yearOfBirth: "1987",
      phone: "09012100343",
      time: "14:30 15/08/2023",
      address: "12 3/2, CanTho",
    },
  ]);

  return (
    <div className="App">
      <h4>Danh sách bệnh nhân</h4>
      <div className="p-d-flex p-jc-end">
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
        &nbsp;
        <Button
          label="+ Tạo mới"
          severity="info"
          onClick={() => setShowForm(true)}
        />
        {showForm && (
          <div className="rightside">
            <Form
              closeForm={() => {
                setShowForm(false);
              }}
            />
          </div>
        )}
      </div>
      <div className="p-d-flex">
        <div className="p-col-9">
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
        
      </div>
    </div>
  );
};

export default HistoryTable;
