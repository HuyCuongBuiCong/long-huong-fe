import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { getPatients } from '../../../services/patientService';
import Loading from '../../Common/Loading';
import PatientDialog from './PatientDialog';

const PatientList = (props) => {
  const [loading, setLoading] = useState(false);
  const [globalSearchText, setGlobalSearchText] = useState('');
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [pagination, setPagination] = useState({
    first: 0,
    rows: 10
  });

  const [showPatientDialog, setShowPatientDialog] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPatients()
      .then((patients) => {
        setPatients(patients);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onSelectPatient = (patient) => {
    setSelectedPatient(patient);
    if (props.onSelectPatient) {
      props.onSelectPatient(patient);
    }
  };

  const onPageChange = (e) => {
    console.log(e);
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
          active: selectedPatient && selectedPatient.id === patient.id
        })}
        onClick={() => onSelectPatient(patient)}
      >
        <div>
          {patient.name} - {patient.yearOfBirth}
        </div>
        <div>{patient.phoneNumber}</div>
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
        {loading && <Loading />}
        {!loading && patients && (
          <DataView
            className="border-0 p-0"
            value={patients}
            itemTemplate={patientItemTemplate}
            paginator
            paginatorClassName="border-0 p-0"
            first={pagination.first}
            rows={pagination.rows}
            totalRecords={120}
            onPageChange={onPageChange}
          />
        )}
      </div>
      {showPatientDialog && <PatientDialog visible={showPatientDialog} onHide={onHideDialogCreatePatient} />}
    </>
  );
};

export default PatientList;
