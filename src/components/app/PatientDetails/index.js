import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { getPatient } from '../../../services/patientService';
import Loading from '../../Common/Loading';

const PatientDetails = (props) => {
  const patientId = props.patientId;
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    if (patientId) {
      setLoading(true);
      getPatient(patientId)
        .then((patients) => {
          setPatient(patients);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [patientId]);

  return (
    <div>
      {loading && <Loading />}
      {!loading && patient && (
        <div>
          Thong tin bệnh nhân
          <div>
            {patient.name} - {patient.yearOfBirth}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
