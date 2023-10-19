import React from 'react';
import dayjs from 'dayjs';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import { Button } from 'primereact/button';

const MedicalExaminationDetails = ({ selectedMedical, patientId }) => {
  const componentRef = useRef();

  console.log('selectedMedical: ', selectedMedical);
  console.log('patientId:', patientId);

  return (
    <div>
      <ReactToPrint
        trigger={() => {
          return (
            <div className="p-inputgroup text-right">
              <Button icon="pi pi-print" label="In phiếu khám bệnh" />
            </div>
          );
        }}
        content={() => componentRef.current}
        documentTitle="new document"
        pageStyle="print"
        onAfterPrint={() => {
          console.log('document printed');
        }}
      />
      <div ref={componentRef}>
        <h4 className="text-center" style={{ flex: 1, margin: 20 }}>
          Chi tiết phiếu khám bệnh
        </h4>
        <div key={selectedMedical.id}>
          <h5 style={{ marginLeft: 15, marginTop: 20, fontWeight: 700 }}>Lần khám: {selectedMedical.recordNumber}</h5>
          <table className="table table-striped table-sm mt-2">
            <tbody>
              <tr>
                <th>Ngày khám: </th>
                <td>{selectedMedical.date ? dayjs(selectedMedical.created_at).format('DD/MM/YYYY HH:mm') : ''}</td>
              </tr>
              <tr>
                <th>Mã - Tên bệnh: </th>
                <td>
                  {selectedMedical.diseases &&
                    selectedMedical.diseases.map((disease) => (
                      <p key={disease.id}>
                        <span className="p-tag me-2">{disease.diseaseCode}</span>
                        <span>{disease.name}</span>
                      </p>
                    ))}
                </td>
              </tr>
              <tr>
                <th>Chuẩn đoán: </th>
                <td>{selectedMedical.description}</td>
              </tr>
              <tr>
                <th>Toa thuốc: </th>
                <td>
                  <ul>
                    {selectedMedical.prescriptions &&
                      selectedMedical.prescriptions.map((prescription) => (
                        <p key={prescription.id}>- {prescription.name}</p>
                      ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <th>Tập tin đính kèm: {selectedMedical.files} </th>
                <td>
                  <ul></ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MedicalExaminationDetails;
