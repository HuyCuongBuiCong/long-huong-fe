import React, { useEffect, useState } from 'react';
import patientService from '../../../services/patientService';
import Loading from '../../Common/Loading';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import dayjs from 'dayjs';
import { Button } from 'primereact/button';
import MedicalExDialog from '../MedicalExamination/MedicalExDialog';
import MedicalExaminationDetails from '../MedicalExamination';
import PrintPatient from '../PrintPatient/PrintPatient';

const PatientDetails = (props) => {
  const patientId = props.patientId;
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedMedical, setSelectedMedical] = useState(null);
  const [showMedicalDialog, setShowMedicalDialog] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);

  const onShowDialogCreateMedical = () => {
    setShowMedicalDialog(true);
  };
  const onHideDialogCreateMedical = () => {
    setShowMedicalDialog(false);
  };

  const handlePrescriptionChange = (prescriptions) => {
    setPrescriptions(prescriptions);
  };

  useEffect(() => {
    setSelectedMedical(null);
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

  const indexFieldBodyTemplate = (medicalRecord) => {
    const index = medicalRecord.index;
    return <div>{index}</div>;
  };

  const dateFieldBodyTemplate = (medicalRecord) => {
    const date = medicalRecord.created_at;
    return <span>{date && dayjs(date).format('DD/MM/YYYY HH:mm')}</span>;
  };

  const yearOfBirth = patient?.yearOfBirth ? new Date(patient.yearOfBirth).getFullYear() : '';
  const age = yearOfBirth ? new Date().getFullYear() - yearOfBirth : '';

  return (
    <div>
      {loading && <Loading />}
      {!loading && patient && (
        <div>
          <div className="card">
            <h4 style={{ flex: 1, margin: 20 }}>Thông tin bệnh nhân</h4>
            <table className="table table-striped table-sm mt-2">
              <tbody>
                <tr>
                  <th>Họ và tên:</th>
                  <td>{patient.fullname}</td>
                  <th>Năm sinh:</th>
                  <td>{yearOfBirth ? `${yearOfBirth}, ${age} tuổi` : ''}</td>
                  <th>Giới tính:</th>
                  <td>{patient.gender}</td>
                </tr>
                <tr>
                  <th>Số điện thoại: </th>
                  <td>{patient.phone}</td>
                  <th>Địa chỉ: </th>
                  <td colspan="2">
                    {patient.ward} - {patient.city}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card">
            <div className="search-box d-flex align-items-center gap-1">
              <div className="p-inputgroup">
                <h4 style={{ flex: 1, margin: 20 }}>Lịch sử khám bệnh</h4>
                <Button icon="pi pi-plus-circle" label="Tiếp nhận bệnh mới" onClick={onShowDialogCreateMedical} />
              </div>
            </div>
            {medicalRecords && (
              <DataTable
                value={medicalRecords}
                emptyMessage="Không có lần khám bệnh nào"
                className="p-datatable-striped"
                sortField="createdAt"
                sortOrder={-1}
                selectionMode="single"
                selection={selectedMedical}
                onSelectionChange={(e) => setSelectedMedical(e.value)}
              >
                <Column header="STT" body={(data, options) => options.rowIndex + 1} className="w-8" />
                <Column field="diseases" header="Bệnh" body={diseasesFieldBodyTemplate} className="w-25" />
                <Column
                  field="prescriptions"
                  header="Toa thuốc"
                  body={prescriptionsFieldBodyTemplate}
                  className="w-25"
                />
                <Column field="description" header="Chuẩn đoán" />
                <Column field="recordNumber" header="Lần khám" className="w-8" />
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
          <div className="card">
            {selectedMedical ? (
              <MedicalExaminationDetails selectedMedical={selectedMedical} patient={patient} />
            ) : (
              <h4 style={{ flex: 1, margin: 20 }}>Vui lòng chọn lần khám bệnh để xem chi tiết.</h4>
            )}
          </div>{' '}
          <div className="card">
            {selectedMedical && <PrintPatient selectedMedical={selectedMedical} patient={patient} />}
          </div>
        </div>
      )}{' '}
      {showMedicalDialog && (
        <MedicalExDialog
          patientId={patientId}
          visible={showMedicalDialog}
          onHide={onHideDialogCreateMedical}
          onPrescriptionChange={handlePrescriptionChange}
        />
      )}
    </div>
  );
};

export default PatientDetails;
