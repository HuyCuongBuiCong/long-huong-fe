import React, { useEffect, useState } from 'react';
import patientService from '../../../services/patientService';
import Loading from '../../Common/Loading';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import dayjs from 'dayjs';

const PatientDetails = (props) => {
  const patientId = props.patientId;
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    if (patientId) {
      setLoading(true);
      patientService
        .getPatient(patientId)
        .then((patients) => {
          setPatient(patients);
        })
        .finally(() => {
          setLoading(false);
        });
      patientService.getPatientMedicalRecords(patientId).then((records) => {
        console.log(records);
        setMedicalRecords(records);
      });
    }
  }, [patientId]);

  const diseasesFieldBodyTemplate = (medicalRecord) => {
    const diseases = medicalRecord.diseases || [];
    return (
      <>
        {diseases.map((disease) => (
          <div key={disease.id} className="mb-2">
            <span className="p-tag me-2">{disease.diseaseCode}</span>
            <span>{disease.name}</span>
          </div>
        ))}
      </>
    );
  };

  const prescriptionsFieldBodyTemplate = (medicalRecord) => {
    const prescriptions = medicalRecord.prescriptions || [];
    return (
      <>
        {prescriptions.map((prescription) => (
          <div key={prescription.id}>- {prescription.name}</div>
        ))}
      </>
    );
  };

  const dateFieldBodyTemplate = (medicalRecord) => {
    const date = medicalRecord.date;
    return <span>{date && dayjs(date).format('DD/MM/YYYY')}</span>;
  };

  return (
    <div>
      {loading && <Loading />}
      {!loading && patient && (
        <div>
          Thong tin bệnh nhân
          <div>
            {patient.fullname} - {patient.yearOfBirth} - {patient.city} - {patient.ward}
          </div>
          {medicalRecords && (
            <DataTable
              value={medicalRecords}
              emptyMessage="No data found"
              className="p-datatable-striped"
              sortField="createdAt"
              sortOrder={-1}
            >
              <Column header="STT" body={(data, options) => options.rowIndex + 1} className="w-8" />
              <Column field="description" header="Chuẩn đoán" />
              <Column field="diseases" header="Bệnh" body={diseasesFieldBodyTemplate} className="w-25" />
              <Column field="prescriptions" header="Toa thuốc" body={prescriptionsFieldBodyTemplate} className="w-25" />
              <Column
                field="date"
                header="Ngày khám"
                body={dateFieldBodyTemplate}
                className="w-10 text-center"
                headerClassName="d-flex justify-content-center"
              />
            </DataTable>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
