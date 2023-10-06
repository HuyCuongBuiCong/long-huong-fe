import React, { useState } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import PatientList from '../PatientList';
import PatientDetails from '../PatientDetails';

const MainPage = (props) => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const onSelectPatient = (patient) => {
    setSelectedPatient(patient);
  };

  return (
    <div className="h-100">
      <Splitter className="MainPage" style={{ height: '100%' }}>
        <SplitterPanel className="flex align-items-center justify-content-center" size={25} minSize={25}>
          <div className="p-2 h-100 overflow-auto">
            <PatientList onSelectPatient={onSelectPatient} />
          </div>
        </SplitterPanel>
        <SplitterPanel className="flex align-items-center justify-content-center" size={75} minSize={50}>
          <div className="p-2 h-100">{selectedPatient && <PatientDetails patientId={selectedPatient.id} />}</div>
        </SplitterPanel>
      </Splitter>
    </div>
  );
};

export default MainPage;
