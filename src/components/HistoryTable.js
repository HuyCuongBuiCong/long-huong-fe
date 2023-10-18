import React, { useEffect, useState } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { BiSearchAlt } from 'react-icons/bi';
import { Button } from 'primereact/button';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import PatientDetail from './PatientDetail.jsx';
import PatientForm from './PatientForm.js';
import { Dialog } from 'primereact/dialog';
import '../styles/HistoryTable.css';
import axios from 'axios';
import 'primeicons/primeicons.css';
import MedicalExDetail from './MedicalExDetail.js';
import { Paginator } from 'primereact/paginator';
import beAxios from '../config.js';

const HistoryTable = () => {
  const [visible, setVisible] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [showSplitter, setShowSplitter] = useState(false);
  const [showHistoryTable, setShowHistoryTable] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [showPatientDetail, setShowPatientDetail] = useState(false);
  const [selectedExamination, setSelectedExamination] = useState(null);

  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [lastPage, setLastPage] = useState(1);

  const onPageChange = async (event) => {
    setCurrentPage(event.page + 1);
  };

  const [medicalRecords, setMedicalRecords] = useState([]);

  const handleFilter = async (e) => {
    const pt = e.target.value;
    console.log(pt);
    try {
      const response = await beAxios.get(`/patients?page=${currentPage}&limit=10&search=${pt}`);
      console.log(response);
      setMedicalRecords(response.data.patients.data);
      setTotal(response.data.patients.total);
      setCurrentPage(response.data.patients.currentPage);
      setNextPage(response.data.patients.nextPage);
      setPreviousPage(response.data.patients.previousPage);
      setLastPage(response.data.patients.lastPage);
      setSelectedExamination(null);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await beAxios.get(`/patients?page=${currentPage}&limit=10&search=`);
        setMedicalRecords(response.data.patients.data);
        setTotal(response.data.patients.total);
        setCurrentPage(response.data.patients.currentPage);
        setNextPage(response.data.patients.nextPage);
        setPreviousPage(response.data.patients.previousPage);
        setLastPage(response.data.patients.lastPage);
        // console.log(total, "total");
        // console.log(currentPage, "cur");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [currentPage]);

  const showDetailForm = (patient) => {
    setSelectedContainer(patient.patient_id);
    setSelectedPatientId(patient.patient_id);
    setShowSplitter(true);
    setShowHistoryTable(false);
    setShowDetail(true);
    setShowPatientDetail(true);
    setSelectedExamination(null);
  };

  const handleAddPatientClick = () => {
    setVisible(true);
  };

  const yearOfBirthTemplate = (data) => {
    const age = new Date().getFullYear() - data.patient_yearOfBirth;
    return (
      <p>
        {data.patient_yearOfBirth}, {age} tuổi
      </p>
    );
  };

  const addressTemplate = (data) => {
    return (
      <p>
        {data.patient_ward}, {data.patient_city}
      </p>
    );
  };

  return (
    <div className="App">
      {showHistoryTable && (
        <div>
          <h4 style={{ marginLeft: 5 }} className="mt-3">
            Danh sách bệnh nhân
          </h4>
          <div className="p-d-flex p-jc-end" style={{ marginLeft: 5 }}>
            <span className="p-input-icon-left">
              <InputText type="search" onInput={handleFilter} placeholder="Search..." />
              <BiSearchAlt />
            </span>
            &nbsp;
            <Button icon="pi pi-plus" label="Thêm bệnh nhân" severity="info" onClick={handleAddPatientClick} />
            <Dialog
              header="Thêm bệnh nhân"
              visible={visible}
              style={{ width: '50vw' }}
              onHide={() => setVisible(false)}
            >
              <PatientForm
                closeForm={() => setVisible(false)}
                onSubmit={() => {
                  setVisible(false);
                }}
              />
            </Dialog>
          </div>{' '}
          <div className="p-d-flex mt-3">
            <div className="card">
              {medicalRecords.length > 0 ? (
                <>
                  <DataTable
                    value={medicalRecords}
                    first={(currentPage - 1) * 10}
                    rows={10}
                    rowsPerPageOptions={[10, 20, 30]}
                    totalRecords={total}
                    onPageChange={onPageChange}
                    onRowClick={(e) => showDetailForm(e.data)}
                  >
                    <Column field="patient_id" header="STT" sortable></Column>
                    <Column field="patient_fullname" header="Họ tên" sortable></Column>
                    <Column body={yearOfBirthTemplate} header="Năm sinh" sortable></Column>
                    <Column field="patient_phone" header="Số điện thoại" sortable></Column>
                    <Column body={addressTemplate} header="Địa chỉ" sortable></Column>
                  </DataTable>
                  <Paginator
                    first={(currentPage - 1) * 10}
                    rows={10}
                    totalRecords={total}
                    rowsPerPageOptions={[10, 20, 30]}
                    onPageChange={onPageChange}
                  />
                </>
              ) : (
                <p>Đang tải danh sách bệnh nhân.</p>
              )}
            </div>
          </div>
        </div>
      )}
      {showSplitter && (
        <Splitter style={{ height: '100%' }}>
          <SplitterPanel
            size={20}
            style={{ fontSize: 16, margin: 5 }}
            className="flex align-items-center justify-content-center"
          >
            <div>
              <h4 className="mt-3">Danh sách bệnh nhân</h4>
              <div className="p-d-flex p-jc-end">
                <span className="p-input-icon-left">
                  <InputText type="search" onInput={handleFilter} placeholder="Search..." />
                  <BiSearchAlt />
                </span>
                &nbsp;
                <Button
                  className="mt-1"
                  icon="pi pi-plus"
                  label="Thêm bệnh nhân"
                  severity="info"
                  onClick={() => {
                    setShowPatientDetail(false);
                    setShowDetail(true);
                    handleAddPatientClick(true);
                  }}
                />
                <Dialog
                  header="Thêm bệnh nhân"
                  visible={visible}
                  style={{ width: '50vw' }}
                  onHide={() => setVisible(false)}
                >
                  <PatientForm
                    closeForm={() => setVisible(false)}
                    onSubmit={() => {
                      setVisible(false);
                    }}
                  />
                </Dialog>
              </div>{' '}
              <div className="p-d-flex mt-2">
                <div className="p-col-9 list-patient">
                  {medicalRecords.length > 0 ? (
                    medicalRecords.map((patient) => (
                      <div
                        className={`container ${patient.patient_id === selectedContainer ? 'selected' : ''}`}
                        key={patient.patient_id}
                        onClick={() => showDetailForm(patient)}
                      >
                        <p>
                          {patient.patient_fullname} - {patient.patient_yearOfBirth}
                        </p>
                        <p>
                          {patient.patient_phone} - {patient.patient_ward}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p style={{ margin: 10 }}>Đang tải danh sách bệnh nhân.</p>
                  )}
                </div>
              </div>
            </div>
          </SplitterPanel>
          <SplitterPanel size={80} className="flex align-items-center justify-content-center">
            {selectedPatientId && !selectedExamination ? (
              <PatientDetail
                // to="/patient_detail"
                selectedPatientId={selectedPatientId}
                closeDetail={() => {
                  setShowDetail(false);
                  setShowSplitter(false);
                  setShowHistoryTable(true);
                  setShowPatientDetail(false);
                  setSelectedExamination(null);
                }}
              />
            ) : null}
            {selectedExamination && selectedExamination.patient_id === selectedPatientId ? (
              <MedicalExDetail
                selectedExamination={selectedExamination}
                closeDetail={() => setSelectedExamination(null)}
                selectedPatientId={selectedPatientId}
              />
            ) : null}
          </SplitterPanel>
        </Splitter>
      )}
    </div>
  );
};

export default HistoryTable;
