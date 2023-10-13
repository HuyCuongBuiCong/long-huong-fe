import React from 'react';
import dayjs from 'dayjs';

const MedicalExaminationDetails = ({ selectedMedical, patientId }) => {
  console.log('selectedMedical: ', selectedMedical);
  console.log('patientId:', patientId);
  return (
    <div>
      <h4 style={{ flex: 1, margin: 20 }}>Chi tiết phiếu khám bệnh</h4>
      <div key={selectedMedical.id}>
        <h5 style={{ marginLeft: 10, marginTop: 20, fontWeight: 700 }}>Lần khám: {selectedMedical.index}</h5>
        <table className="table">
          <tbody>
            <tr>
              <th>Ngày khám: </th>
              <td>{selectedMedical.date ? dayjs(selectedMedical.date).format('DD/MM/YYYY') : ''}</td>
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
              <th>Tập tin đính kèm: </th>
              <td>
                <ul>
                  {selectedMedical.attachments &&
                    selectedMedical.attachments.map((attachment) => <p key={attachment.id}>{attachment.name}</p>)}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalExaminationDetails;
