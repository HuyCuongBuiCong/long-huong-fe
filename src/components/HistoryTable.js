import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { BiSearchAlt } from "react-icons/bi";
import { Button } from "primereact/button";
import { patientsData } from "../data.js";
import Form from "./Form";
import { Splitter, SplitterPanel } from "primereact/splitter";
import PatientDetail from "./PatientDetail.js";
import axios from "axios";
import { Calendar } from "primereact/calendar";

const HistoryTable = () => {
  const [posts, setPosts] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showSplitter, setShowSplitter] = useState(false); // Khởi tạo showSplitter là false để ẩn Splitter
  const [showHistoryTable, setShowHistoryTable] = useState(true); // Khởi tạo showHistoryTable là true để hiển thị HistoryTable
  const [showDetail, setShowDetail] = useState(false); // Khởi tạo showDetail là false

  const [filteredData, setFilteredData] = useState(patientsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [customers, setCustomers] = useState(null);
  const customFilter = (value, filter) => {
    if (!filter.startDate || !filter.endDate) {
      return true;
    }

    const date = new Date(value);
    return filter.startDate <= date && date <= filter.endDate;
  };

  const onPageChange = (event) => {
    setCurrentPage(event.page + 1); // Trong PrimeReact, trang bắt đầu từ 0, nhưng currentPage thường bắt đầu từ 1
  };

  const itemsPerPage = 5; // Số mục trên mỗi trang

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleData = filteredData.slice(startIndex, endIndex);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const handleFilter = (e) => {
    setFilters({
      global: {
        value: e.target.value,
        matchMode: FilterMatchMode.CONTAINS,
      },
    });

    const filteredPatients = patientsData.filter((patient) =>
      Object.values(patient).some((field) =>
        String(field).toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

    setFilteredData(filteredPatients);
  };

  const showDetailForm = (patient) => {
    setSelectedPatient(patient);
    setShowForm(false);
    setShowSplitter(true);
    setShowHistoryTable(false);
    setShowDetail(true);
  };

  const header = (
    <div className="flex justify-content-end">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText placeholder="Keyword Search" />
      </span>
    </div>
  );

  return (
    <div className="App">
      {showHistoryTable && (
        <div>
          <h4 style={{ marginLeft: 5 }} className="mt-3">
            Danh sách bệnh nhân
          </h4>
          <div className="p-d-flex p-jc-end" style={{ marginLeft: 5 }}>
            <span className="p-input-icon-left">
              <InputText
                type="search"
                onInput={handleFilter}
                placeholder="Search..."
              />
              <BiSearchAlt />
            </span>
            &nbsp;
            <Button
              icon="pi pi-plus"
              label="Tạo mới"
              severity="info"
              onClick={() => {
                setShowForm(true);
                setShowSplitter(true);
                setShowHistoryTable(false);
                setShowDetail(false);
              }}
            />
          </div>{" "}
          <div className="p-d-flex mt-3">
            <div className="p-col-9">
              <DataTable
                value={filteredData}
                sortMode="multiple"
                filters={filters}
                filterDisplay="row"
                paginator
                rows={5}
                rowsPerPageOptions={[1, 2, 3, 4, 5]}
                totalRecords={filteredData.length}
                onRowClick={(e) => showDetailForm(e.data)}
              >
                <Column field="patient_id" header="STT" sortable />
                <Column
                  field="patient_fullname"
                  header="Họ tên"
                  filter
                  filterPlaceholder="Nhập tên bệnh nhân"
                  sortable
                />
                <Column
                  field="patient_yearOfBirth"
                  header="Năm sinh"
                  sortable
                  filter
                  filterPlaceholder="Nhập năm sinh hoặc tuổi"
                />
                <Column
                  field="patient_phone"
                  header="Số điện thoại"
                  sortable
                  filter
                  filterPlaceholder="Nhập số điện thoại"
                />
                <Column
                  field="patient_city"
                  header="Địa chỉ"
                  sortable
                  filter
                  filterPlaceholder="Nhập địa chỉ"
                />
                <Column
                  field="latest_update"
                  header="Thời gian khám"
                  sortable
                  style={{ minWidth: "12rem" }}
                  filter
                  filterElement={
                    <div className="p-inputgroup">
                      <Calendar
                        style={{ width: 150 }}
                        value={startDate}
                        onChange={(e) => setStartDate(e.value)}
                        dateFormat="dd/mm/yy"
                        placeholder="Từ ngày"
                        showIcon
                      />
                      &nbsp;
                      <Calendar
                        style={{ width: 150 }}
                        value={endDate}
                        onChange={(e) => setEndDate(e.value)}
                        dateFormat="dd/mm/yy"
                        showIcon
                        placeholder="To"
                      />
                    </div>
                  }
                  filterFunction={customFilter}
                />
              </DataTable>
            </div>
          </div>
        </div>
      )}
      {showSplitter && (
        <Splitter style={{ height: "100%" }}>
          <SplitterPanel className="flex align-items-center justify-content-center">
            <div>
              <h4 className="mt-3">Danh sách bệnh nhân</h4>
              <div className="p-d-flex p-jc-end">
                <span className="p-input-icon-left">
                  <InputText
                    type="search"
                    onInput={handleFilter}
                    placeholder="Search..."
                  />
                  <BiSearchAlt />
                </span>
                &nbsp;
                <Button
                  icon="pi pi-plus"
                  label="Tạo mới"
                  severity="info"
                  onClick={() => {
                    setShowForm(true);
                    setShowDetail(false);
                  }}
                />
              </div>{" "}
              <div className="p-d-flex mt-2">
                <div className="p-col-9">
                  <DataTable
                    value={filteredData}
                    sortMode="multiple"
                    filters={filters}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[1, 2, 3, 4, 5]}
                    totalRecords={filteredData.length}
                    onRowClick={(e) => showDetailForm(e.data)}
                  >
                    <Column field="patient_id" header="STT" sortable />
                    <Column field="patient_fullname" header="Họ tên" sortable />
                    <Column
                      field="patient_yearOfBirth"
                      header="Năm sinh"
                      sortable
                    />
                    <Column
                      field="patient_phone"
                      header="Số điện thoại"
                      sortable
                    />
                    <Column field="patient_city" header="Địa chỉ" sortable />
                    <Column
                      field="latest_update"
                      header="Thời gian khám"
                      sortable
                    />
                  </DataTable>
                </div>
              </div>
            </div>
          </SplitterPanel>
          <SplitterPanel className="flex align-items-center justify-content-center">
            {showForm && (
              <Form
                closeForm={() => {
                  setShowForm(false);
                  setShowSplitter(false);
                  setShowHistoryTable(true);
                }}
              />
            )}
            {showDetail && (
              <PatientDetail
                closeDetail={() => {
                  setShowDetail(false);
                  setShowSplitter(false);
                  setShowHistoryTable(true);
                }}
                selectedPatient={selectedPatient}
              />
            )}
          </SplitterPanel>
        </Splitter>
      )}
    </div>
  );
};

export default HistoryTable;
