import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import patientService from '../../../services/patientService';
import Loading from '../../Common/Loading';
import PatientDialog from './PatientDialog';
import { useDebounce } from 'primereact/hooks';

const ROWS_PER_PAGE = 10;

const PatientList = (props) => {
  const [loading, setLoading] = useState(false);
  const [globalSearchText, debouncedGlobalSearchText, setGlobalSearchText] = useDebounce('', 400);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rows: ROWS_PER_PAGE,
    total: 0,
    first: 0
  });

  const [showPatientDialog, setShowPatientDialog] = useState(false);

  useEffect(() => {
    const filter = {
      search: globalSearchText
    };
    handleGetPatients(filter);
  }, [debouncedGlobalSearchText]);

  const handleGetPatients = (filter) => {
    setLoading(true);
    patientService
      .getPatients(filter)
      .then((patientData) => {
        setPatients(patientData.data);
        setPagination({
          ...pagination,
          total: patientData.total,
          first: pagination.rows * (patientData.currentPage - 1),
          currentPage: patientData.currentPage
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSelectPatient = (patient) => {
    setSelectedPatient(patient);
    if (props.onSelectPatient) {
      props.onSelectPatient(patient);
    }
  };

  const onPage = (e) => {
    console.log(e);
    const filter = {
      search: globalSearchText,
      page: e.page + 1,
      limit: ROWS_PER_PAGE
    };
    handleGetPatients(filter);
  };

  const onShowDialogCreatePatient = () => {
    setShowPatientDialog(true);
  };

  const onHideDialogCreatePatient = () => {
    setShowPatientDialog(false);
  };

  const patientItemTemplate = (patient) => {
    return (
      <div
        className={classnames('patient-item', {
          active: selectedPatient && selectedPatient.patient_id === patient.patient_id
        })}
        onClick={() => onSelectPatient(patient)}
      >
        <div>
          {patient.patient_fullname} - {patient.patient_yearOfBirth}
        </div>
        <div>{patient.patient_phone}</div>
      </div>
    );
  };

  return (
    <>
      <div className="search-box d-flex align-items-center gap-1">
        <div className="p-inputgroup">
          <InputText
            placeholder="Tìm kiếm..."
            value={globalSearchText}
            onChange={(e) => setGlobalSearchText(e.target.value)}
          />
          <Button icon="pi pi-search" className="p-button-warning" />
          <Button icon="pi pi-plus-circle" label="Thêm BN" onClick={onShowDialogCreatePatient} />
        </div>
      </div>
      <div className="patient-list pt-3">
        {loading && !patients && <Loading />}
        {patients && (
          <DataView
            className="border-0 p-0"
            value={patients}
            itemTemplate={patientItemTemplate}
            lazy={true}
            loading={loading}
            paginator
            paginatorClassName="border-0 p-0"
            first={pagination.first}
            rows={pagination.rows}
            totalRecords={pagination.total}
            onPage={onPage}
          />
        )}
      </div>
      {showPatientDialog && <PatientDialog visible={showPatientDialog} onHide={onHideDialogCreatePatient} />}
    </>
  );
};

export default PatientList;
